import { FC } from 'react';
import useDisclosure from 'hooks/useDisclosure';
import BlockModal from 'components/BlockModal';
import DeleteBlockConfirmModal from 'components/DeleteBlockConfirmModal';

const BlockRow: FC<BlockRowProps> = ({ block }) => {
	const editController = useDisclosure();
	const deleteController = useDisclosure();

	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">{block.index}</td>
			<td className="px-6 py-4 whitespace-nowrap">{block.name}</td>
			<td className="px-6 py-4 whitespace-nowrap text-right">{block.height}</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<button className="text-indigo-600 hover:text-indigo-900" onClick={editController.onOpen}>
					Edit
				</button>
				<button className="text-red-600 hover:text-red-700 ml-3" onClick={deleteController.onOpen}>
					Delete
				</button>
			</td>
			<BlockModal isOpen={editController.isOpen} onClose={editController.onClose} block={block} building_id={block.building_id} />
			<DeleteBlockConfirmModal isOpen={deleteController.isOpen} onClose={deleteController.onClose} block={block} />
		</tr>
	);
};

export default BlockRow;

// component props
type BlockRowProps = {
	block: any;
};
