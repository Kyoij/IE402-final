import BuildingModal from 'components/BuildingModal';
import DeleteConfirmModal from 'components/DeleteConfirmModal';
import useDisclosure from 'hooks/useDisclosure';
import { FC } from 'react';
import { definitions } from 'types/supabase';

const BuildingRow: FC<BuildingRowProps> = ({ building }) => {
	const editController = useDisclosure();
	const deleteController = useDisclosure();

	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">{building.name}</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<button className="text-indigo-600 hover:text-indigo-900" onClick={editController.onOpen}>
					Edit
				</button>
				<button className="text-red-600 hover:text-red-700 ml-3" onClick={deleteController.onOpen}>
					Delete
				</button>
			</td>
			<BuildingModal isOpen={editController.isOpen} onClose={editController.onClose} building={building} />
			<DeleteConfirmModal
				isOpen={deleteController.isOpen}
				onClose={deleteController.onClose}
				entity="building"
				entityId={building.id}
			/>
		</tr>
	);
};

export default BuildingRow;

// component props
type BuildingRowProps = {
	building: definitions['Building'];
};
