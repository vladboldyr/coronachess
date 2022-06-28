import {useQuery, useResult} from '@vue/apollo-composable';
import {watch} from 'vue';
import gql from 'graphql-tag';

const GET_PUZZLE = gql`
          query {
            puzzle(id: 1367) {
              id
              name
              position
              solution
              tags {
               name_ru
              }
            }
          }
    `;

const GET_BY_ID_PUZZLE = gql`
          query getPuzzle($id: ID!){
            puzzle(id: $id) {
              id
              name
              position
              solution
              tags {
               name_ru
              }
            }
          }
    `;
export function loadByIdPuzzle() {
  const {result} = useQuery(GET_BY_ID_PUZZLE, {id: 104});
  watch(result, value => {
    console.log('result', value);
  });
  return useResult(result, '', data => data.puzzle.position);
}
export function loadPuzzle() {
  const { result, onResult } = useQuery(GET_PUZZLE);
  /* onResult(queryResult => {
    console.log(queryResult.data)
    console.log(queryResult.loading)
    console.log(queryResult.networkStatus)
  }) */
  watch(result, value => {
    console.log('data', value);
  });

  const position = useResult(result, '', data => data.puzzle.position);
  return position;
}
