import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListItem, Body } from 'native-base';
import { Screen } from '@app/components/Screen';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from '@app/store';

const query = gql`
  query {
    Country {
      name
    }
  }
`;

export const UserProfile: React.FC<void> = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { loading, error, data } = useQuery(query);

  return (
    <Screen title="Profile" disableContent>
      <Text>User profile</Text>
      {currentUser ? <Text>{currentUser.displayName}</Text> : null}
      {!loading && !error ? (
        <FlatList
          data={data.Country}
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ListItem>
              <Body>
                <Text>{item.name}</Text>
              </Body>
            </ListItem>
          )}
        />
      ) : null}
    </Screen>
  );
};
