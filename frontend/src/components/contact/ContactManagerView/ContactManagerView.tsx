import { useApiContacts } from 'hooks/pims-api/useApiContacts';
import { useSearch } from 'hooks/useSearch';
import { IContactSearchResult } from 'interfaces/IContactSearchResult';
import { useCallback, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { IoMdPersonAdd } from 'react-icons/io';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import {
  ContactFilterComponent,
  defaultFilter,
} from './ContactFilterComponent/ContactFilterComponent';
import { ContactResultComponent } from './ContactResultComponent/ContactResultComponent';
import { IContactFilter } from './IContactFilter';

interface IContactManagerViewProps {
  setSelectedRows?: (selectedContacts: IContactSearchResult[]) => void;
  selectedRows?: IContactSearchResult[];
  showSelectedRowCount?: boolean;
  isSummary?: boolean;
  noInitialSearch?: boolean;
  className?: string;
  showAddButton?: boolean;
  showActiveSelector?: boolean;
}

/**
 * Component that provides functionality manage contacts. Can be embedded as a widget.
 */
const ContactManagerView = ({
  setSelectedRows,
  selectedRows,
  className,
  isSummary,
  noInitialSearch,
  showSelectedRowCount,
  showAddButton,
  showActiveSelector,
}: IContactManagerViewProps) => {
  const history = useHistory();
  const { getContacts } = useApiContacts();

  var initialFilter: IContactFilter = (noInitialSearch
    ? undefined
    : defaultFilter) as IContactFilter;

  const {
    results,
    filter,
    sort,
    error,
    currentPage,
    totalPages,
    pageSize,
    setFilter,
    setSort,
    setCurrentPage,
    setPageSize,
    loading,
  } = useSearch<IContactSearchResult, IContactFilter>(
    initialFilter,
    getContacts,
    'Search returned no results',
  );

  // update internal state whenever the filter bar changes
  const changeFilter = useCallback(
    (filter: IContactFilter) => {
      setFilter(filter);
      setCurrentPage(0);
    },
    [setFilter, setCurrentPage],
  );

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  return (
    <div className={className}>
      <Row>
        <Col className="">
          <ContactFilterComponent
            filter={filter}
            setFilter={changeFilter}
            showActiveSelector={showActiveSelector}
          />
        </Col>
        {showAddButton && (
          <ColButton xs="auto" xl="3" className="pl-0">
            <PrimaryButton onClick={() => history.push('/contact/new')}>
              <IoMdPersonAdd color="white" />
              <span>Add new contact</span>
            </PrimaryButton>
          </ColButton>
        )}
      </Row>
      <div>
        <ContactResultComponent
          loading={loading}
          results={results}
          sort={sort}
          pageSize={pageSize}
          pageIndex={currentPage}
          setSort={setSort}
          setPageSize={setPageSize}
          setPageIndex={setCurrentPage}
          pageCount={totalPages}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          showSelectedRowCount={showSelectedRowCount}
          isSummary={isSummary}
        />
      </div>
    </div>
  );
};

export default ContactManagerView;

export const ColButton = styled(Col)``;

export const PrimaryButton = styled(Button)`
  margin: 0.4rem 0.6rem;
  white-space: nowrap;
  display: inline-block;
  gap: 1rem;
`;