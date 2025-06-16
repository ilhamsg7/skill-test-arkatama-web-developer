import { IconTrash } from "justd-icons"
import { Button, Modal } from "./ui"

type DeleteDialogProps = {
    id: any,
    onDelete: (params: any) => void,
    onOpenChange: (id: any) => void
}

export const DeleteDialog = ({ id, onDelete, onOpenChange }: DeleteDialogProps) => {
    return (
        <Modal.Content isOpen={id} onOpenChange={() => onOpenChange(null)} >
            <Modal.Header>
                <Modal.Title>Confirmation</Modal.Title>
                <Modal.Description>
                    You want to delete data, note this action is irreversible.
                </Modal.Description>
            </Modal.Header>
            <Modal.Footer>
                {
                    id && <form onSubmit={onDelete} >
                        <input type="hidden" name="_method" value="DELETE" />
                        <Button intent="danger" type="submit">
                            <IconTrash />
                            Delete
                        </Button>
                    </form>
                }
            </Modal.Footer>
        </Modal.Content>
    )
}