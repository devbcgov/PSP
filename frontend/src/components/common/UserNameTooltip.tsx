import { useApiUsers } from 'hooks/pims-api/useApiUsers';
import useIsMounted from 'hooks/useIsMounted';
import * as React from 'react';
import styled from 'styled-components';

import TooltipIcon from './TooltipIcon';

export interface IUserNameTooltipProps {
  userGuid?: string;
  userName?: string;
}

/** Generic user info tooltip component that displays user name on hover */
export const UserNameTooltip: React.FunctionComponent<IUserNameTooltipProps> = ({
  userGuid,
  userName,
}) => {
  const isMounted = useIsMounted();
  const { getUserInfo } = useApiUsers();
  const [userNameInfo, setUserNameInfo] = React.useState<string>('');
  React.useEffect(() => {
    if (userGuid) {
      getUserInfo(userGuid).then(({ data }) => {
        if (data && isMounted()) {
          const { firstName, surname, middleName } = data;
          const nameArr: string[] = [];
          if (firstName) nameArr.push(firstName);
          if (middleName) nameArr.push(middleName);
          if (surname) nameArr.push(surname);
          setUserNameInfo(nameArr.join(' '));
        }
      });
    }
  }, [userGuid, isMounted, getUserInfo]);

  return (
    <TooltipIcon
      toolTipId={'userNameTooltip'}
      className={'userNameTooltip'}
      toolTip={userNameInfo}
      customToolTipIcon={<StyledUserLabel>{userName ?? 'USER'}</StyledUserLabel>}
    ></TooltipIcon>
  );
};

const StyledUserLabel = styled.span`
  font-style: italic;
  font-weight: bold;
  color: black;
`;