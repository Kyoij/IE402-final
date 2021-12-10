import { FC } from 'react';
import { definitions } from 'types/supabase';
import FloorRow from './FloorRow';

const FloorTable: FC<FloorTableProps> = ({ floors }) => {
	return (
		<div className="flex flex-col mt-2">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Index
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Height
									</th>

									<th scope="col" className="relative px-6 py-3">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{floors?.map((floor) => (
									<FloorRow floor={floor} key={floor.id} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FloorTable;

// component props
type FloorTableProps = {
	floors?: definitions['Floor'][] | null;
};
