import DeleteFloorConfirmModal from 'components/DeleteFloorConfirmModal';
import FloorModal from 'components/FloorModal';
import useDisclosure from 'hooks/useDisclosure';
import { FC } from 'react';
import { definitions } from 'types/supabase';

const FloorRow: FC<FloorRowProps> = ({ floor }) => {
	const editController = useDisclosure();
	const deleteController = useDisclosure();

	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">{floor.name}</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<button className="text-indigo-600 hover:text-indigo-900" onClick={editController.onOpen}>
					Edit
				</button>
				<button className="text-red-600 hover:text-red-700 ml-3" onClick={deleteController.onOpen}>
					Delete
				</button>
			</td>
			<FloorModal isOpen={editController.isOpen} onClose={editController.onClose} floor={floor} />
			<DeleteFloorConfirmModal isOpen={deleteController.isOpen} onClose={deleteController.onClose} floor={floor} />
		</tr>
	);
};

export default FloorRow;

// component props
type FloorRowProps = {
	floor: definitions['Building'];
};
