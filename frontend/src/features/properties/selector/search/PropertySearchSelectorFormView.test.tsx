import { mockPropertyLayerSearchResponse } from 'mocks/filterDataMock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act, fillInput, render, RenderOptions, userEvent, waitFor } from 'utils/test-utils';

import { defaultLayerFilter } from './LayerFilter';
import {
  IPropertySearchSelectorFormViewProps,
  PropertySearchSelectorFormView,
} from './PropertySearchSelectorFormView';

const mockStore = configureMockStore([thunk]);

const store = mockStore({});

const onSelectedProperties = jest.fn();
const onSearch = jest.fn();
const onAddressChange = jest.fn();
const onAddressSelect = jest.fn();

describe('PropertySearchSelectorFormView component', () => {
  const setup = (renderOptions: RenderOptions & Partial<IPropertySearchSelectorFormViewProps>) => {
    // render component under test
    const component = render(
      <PropertySearchSelectorFormView
        onSearch={onSearch}
        onSelectedProperties={onSelectedProperties}
        searchResults={renderOptions.searchResults ?? []}
        loading={renderOptions.loading ?? false}
        selectedProperties={renderOptions.selectedProperties ?? []}
        onAddressChange={onAddressChange}
        onAddressSelect={onAddressSelect}
      />,
      {
        ...renderOptions,
        store: store,
      },
    );

    return {
      store,
      component,
    };
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders as expected when provided no properties', () => {
    const { component } = setup({});
    expect(component.asFragment()).toMatchSnapshot();
  });

  describe('search functionality', () => {
    it('displays the loading spinner when making a request', async () => {
      const {
        component: { getByTitle },
      } = setup({
        loading: true,
      });
      expect(getByTitle('table-loading')).toBeVisible();
    });
    it('can search for a pid', async () => {
      const {
        component: { getByTitle, getByText, container },
      } = setup({});
      getByText('No results found for your search criteria.');
      await fillInput(container, 'searchBy', 'pid', 'select');
      await fillInput(container, 'pid', '123-456-789');
      const searchButton = getByTitle('search');

      userEvent.click(searchButton);
      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith({ ...defaultLayerFilter, pid: '123-456-789' });
      });
    });

    it('can search for a pin', async () => {
      const {
        component: { getByTitle, getByText, container },
      } = setup({});
      getByText('No results found for your search criteria.');
      await fillInput(container, 'searchBy', 'pin', 'select');
      await fillInput(container, 'pin', '54321');
      const searchButton = getByTitle('search');

      userEvent.click(searchButton);
      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith({
          ...defaultLayerFilter,
          searchBy: 'pin',
          pin: '54321',
        });
      });
    });

    it('can search for a plan number', async () => {
      const {
        component: { getByTitle, getByText, container },
      } = setup({});
      getByText('No results found for your search criteria.');
      await fillInput(container, 'searchBy', 'planNumber', 'select');
      await fillInput(container, 'planNumber', '123456');
      const searchButton = getByTitle('search');

      userEvent.click(searchButton);
      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith({
          ...defaultLayerFilter,
          searchBy: 'planNumber',
          planNumber: '123456',
        });
      });
    });

    it('can reset the search criteria', async () => {
      await act(async () => {
        const {
          component: { getByTitle, findByText, queryByDisplayValue, container },
        } = setup({});
        await findByText('No results found for your search criteria.');
        await fillInput(container, 'searchby', 'pid', 'select');
        await fillInput(container, 'pid', '123-456-789');
        expect(queryByDisplayValue('123-456-789')).toBeVisible(); //ensure that expected input value is present.

        const resetButton = getByTitle('reset-button');
        userEvent.click(resetButton);
        expect(onSearch).toHaveBeenCalledWith(defaultLayerFilter);
        expect(queryByDisplayValue('123-456-789')).toBeNull(); //input value should now be cleared.
      });
    });
  });
  describe('search results display', () => {
    it('displays 5 search results at a time', async () => {
      const {
        component: { getByText, getAllByRole },
      } = setup({ searchResults: mockPropertyLayerSearchResponse.features });
      expect(getByText(`1 - 5 of 7`)).toBeVisible();
      expect(getAllByRole('row')).toHaveLength(6);
    });

    it('the search results are paged and paging works as expected', async () => {
      const {
        component: { getByText, getByLabelText, getAllByRole },
      } = setup({ searchResults: mockPropertyLayerSearchResponse.features });
      const nextPage = getByLabelText('Page 2');
      userEvent.click(nextPage);
      await waitFor(async () => {
        expect(getByText(`6 - 7 of 7`)).toBeVisible();
        expect(getAllByRole('row')).toHaveLength(3);
      });
    });

    it('does not display results but displays a warning when more then 15 results are returned', async () => {
      const {
        component: { getByText },
      } = setup({
        searchResults: [
          ...mockPropertyLayerSearchResponse.features,
          ...mockPropertyLayerSearchResponse.features,
          ...mockPropertyLayerSearchResponse.features,
        ],
      });
      expect(
        getByText(
          `Too many results (more than 15) match this criteria. Please refine your search.`,
        ),
      ).toBeVisible();
    });
  });

  describe('selecting results', () => {
    it('search results can be selected', async () => {
      const {
        component: { findByTestId },
      } = setup({ searchResults: mockPropertyLayerSearchResponse.features });
      const checkbox = await findByTestId(
        'selectrow-WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW.fid-674bf6f8_180d8c9b18e_7c12',
      );
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      expect(onSelectedProperties).toHaveBeenCalledWith(expectedFeatureData);
    });
  });
});

const expectedFeatureData = [
  {
    geometry: {
      coordinates: [
        [
          [-121.60861991, 55.70650025],
          [-121.60861925, 55.70588252],
          [-121.60728684, 55.7061924],
          [-121.60718833, 55.70627546],
          [-121.60718846, 55.70643785],
          [-121.60729988, 55.70650069],
          [-121.60861991, 55.70650025],
        ],
      ],
      type: 'Polygon',
    },
    geometry_name: 'SHAPE',
    id: 'WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW.fid-674bf6f8_180d8c9b18e_7c12',
    properties: {
      FEATURE_AREA_SQM: 4478.6462,
      FEATURE_LENGTH_M: 281.3187,
      MUNICIPALITY: 'Chetwynd, District of',
      OBJECTID: 601612446,
      OWNER_TYPE: 'Private',
      PARCEL_CLASS: 'Subdivision',
      PARCEL_FABRIC_POLY_ID: 1994518,
      PARCEL_NAME: '006772331',
      PARCEL_START_DATE: null,
      PARCEL_STATUS: 'Active',
      PID: '006772331',
      PID_NUMBER: 6772331,
      PIN: 10514131,
      PLAN_NUMBER: 'PGP27005',
      REGIONAL_DISTRICT: 'Peace River Regional District',
      SE_ANNO_CAD_DATA: null,
      WHEN_UPDATED: '2019-01-09Z',
    },
    type: 'Feature',
  },
];