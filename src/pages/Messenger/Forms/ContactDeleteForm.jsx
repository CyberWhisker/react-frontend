import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"


export default function DeleteModal({ deleteModal, setDeleteModal }) {
    const handleSubmit = async () => {
        setDeleteModal(false)
    }
    return (
        <Dialog open={deleteModal} onClose={() => setDeleteModal(false)} maxWidth="xs">
            <DialogTitle bgcolor={'error'}>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this Contact? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                <Button onClick={handleSubmit} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}