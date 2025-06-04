import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { deleteConversation } from "../../../api/conversationApi"
import { toast } from "react-toastify"
import { useParams } from "react-router"
import { useEffect, useState } from "react";


export default function ContactDeleteForm({ open, onClose, setTriggerContact, setContact }) {
    const { id } = useParams();
    const handleSubmit = async () => {
        const { data, error } = await deleteConversation(id)
        if (data) {
            setContact(null)
            setTriggerContact(prev => !prev)
            toast.success("Convo Deleted")
        }
        onClose()
    }
    return (
        <Dialog open={open} onClose={() => onClose()} maxWidth="xs">
            <DialogTitle bgcolor={'error'}>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this Contact? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button onClick={() => handleSubmit()} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}