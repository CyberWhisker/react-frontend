import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Card, CardActions, CardContent, CardMedia, Divider, Drawer, Fab, Grid2, IconButton, Typography } from '@mui/material';

import Edit from './Forms/Edit';
import AlertModal from '../../../components/AlertModal';
import Delete from './Forms/Delete';
import FadeInAnimation from '../../../components/FadeInAnimation';
import { Add } from '@mui/icons-material';
import Store from './Forms/Store';
import { fetchProject } from '../../../api/projectApi';
import { toast } from 'react-toastify';

export default function Projects() {
    const [rows, setRows] = useState([]);

    const handleGetData = async () => {
        const { data, error } = await fetchProject()
        if (error) {
            toast.error("Server Error")
        } else {
            setRows(data)
        }
    }

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <Box>
            <CardList rows={rows} handleGetData={handleGetData} />
            <AddContent handleGetData={handleGetData} />
        </Box>
    );
}

function CardList({ rows, handleGetData }) {
    return (
        <Grid2 container spacing={2}>
            {rows.map((item, index) => (
                <Grid2 size={{ xs: 6, md: 3 }} key={index}>
                    <FadeInAnimation index={index}>
                        <Card
                            style={{
                                // backgroundColor: 'slategrey',
                                height: '50vh',
                                width: '100%', // Make width responsive
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={item.title}
                                height="180"
                                src={item.image}
                            />
                            <Divider />
                            <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 5, // Limits to 2 lines, adjust as needed
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <EditContent handleGetData={handleGetData} selected={item} />
                                <DeleteContent handleGetData={handleGetData} selected={item} />
                            </CardActions>
                        </Card>
                    </FadeInAnimation>
                </Grid2>
            ))}
        </Grid2>
    );
}

function AddContent({ handleGetData }) {
    const [storeModal, setStoreModal] = useState(false)
    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
                onClick={() => setStoreModal(true)}
            >
                <Add />
            </Fab>
            <Drawer
                open={storeModal}
                onClose={() => setStoreModal(false)}
                anchor='right'
                sx={{ zIndex: 1300 }}
            >
                <Store
                    handleGetData={handleGetData}
                    onClose={() => setStoreModal(false)}
                />
            </Drawer>
        </>
    )
}

function EditContent({ handleGetData, selected }) {
    const [modal, setModal] = useState(false)
    return (
        <>
            <IconButton variant='contained' color='warning' onClick={() => setModal(true)}><EditIcon /></IconButton>
            <Drawer
                open={modal}
                onClose={() => setModal(false)}
                anchor='right'
                sx={{ zIndex: 1300 }}
            >
                <Edit
                    selected={selected}
                    handleGetData={handleGetData}
                    onClose={() => setModal(false)}
                />
            </Drawer>
        </>
    )
}

function DeleteContent({ handleGetData, selected }) {
    const [modal, setModal] = useState(false)
    return (
        <>
            <IconButton variant='contained' color='error' onClick={() => setModal(true)}><DeleteIcon /></IconButton>
            <AlertModal
                open={modal}
                onClose={() => setModal(false)}
                anchor='right'
                sx={{ zIndex: 1300 }}
            >
                <Delete
                    selected={selected}
                    handleGetData={handleGetData}
                    onClose={() => setModal(false)}
                />
            </AlertModal>
        </>
    )
}

