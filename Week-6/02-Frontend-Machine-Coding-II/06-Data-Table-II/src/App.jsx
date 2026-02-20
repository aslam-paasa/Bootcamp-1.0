/**
 * The is a follow up to the Data Table question, you should complete that
 * question first before attempting this question.
 * 
 * In Data Table, we built a users data table that displays users in a
 * paginated format. Data Tables often allow sorting rows by specific
 * columns in both ascending and descending order.
 * 
 * Requirements:
 * a. Allow sorting by a specific column by clicking on the table header.
 *    The data will be sorted by the selected column in ascending order
 *    (default).
 * b. Clicking on the header of the table that is already sorted by that
 *    column will toggle the sorting order between ascending and descending.
*/

import DataTable from './DataTable';

export default function App() {
  return (
    <div>
      <DataTable />
    </div>
  );
}
