import { ParentSelect } from 'components/common/form/ParentSelect';
import { Claims } from 'constants/claims';
import { useFormikContext } from 'formik';
import useKeycloakWrapper from 'hooks/useKeycloakWrapper';
import React, { useEffect } from 'react';

import { Select, SelectOption } from '../../../components/common/form';
import { IPropertyFilter } from './IPropertyFilter';

interface IPropertyFilterOrganizationOptions {
  disabled?: boolean;
  organizations: SelectOption[];
}

/**
 * Provides a dropdown that populates includeAllProperties and controls the organizations input.
 */
export const PropertyFilterOrganizationOptions: React.FC<IPropertyFilterOrganizationOptions> = ({
  disabled,
  organizations,
}) => {
  const state: { options: any[] } = {
    options: [
      { label: 'My Organizations', value: false },
      { label: 'All Government', value: true },
    ],
  };
  const {
    setFieldValue,
    values: { includeAllProperties },
  } = useFormikContext<IPropertyFilter>();
  const keycloak = useKeycloakWrapper();

  useEffect(() => {
    if (includeAllProperties === false) {
      setFieldValue('organizations', keycloak.organizationId);
    }
  }, [includeAllProperties, keycloak.organizationId, setFieldValue]);

  // access the form context values, no need to pass props

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue('includeAllProperties', event.target.value === 'true');
    setFieldValue('organizations', '');
  };

  return (
    <>
      <Select
        field="includeAllProperties"
        options={state.options}
        onChange={onChange}
        disabled={disabled}
      />
      <ParentSelect
        field="organizations"
        options={organizations}
        filterBy={['code', 'label', 'parent']}
        placeholder={includeAllProperties ? '' : 'Organization'}
        selectClosest
        disabled={(disabled || includeAllProperties) && !keycloak.hasClaim(Claims.ADMIN_PROPERTIES)}
      />
    </>
  );
};