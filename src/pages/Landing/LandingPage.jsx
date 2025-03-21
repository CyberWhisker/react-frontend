import React from 'react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
import FadeInAnimation from '../../components/FadeInAnimation'
import { Link, useNavigate } from 'react-router'
import ProjectSection from './Section/ProjectSection'
import TechStackSection from './Section/TechStackSection'
import ExperienceSection from './Section/ExperienceSection'

function LandingPage() {
    return (
        <Stack>
            <HeroPage />
            <ProjectSection />
            <ExperienceSection />
            <TechStackSection />
        </Stack>
    )
}

function HeroPage() {
    return (
        <Box sx={{
            py: 5,
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} sx={{
                    mt: 6,
                    pb: 5,
                    alignItems: 'center',
                    backgroundImage: 'linear-gradient(135deg, rgba(63,81,181,0.05) 0%, rgba(25,118,210,0.1) 100%)',
                    borderRadius: 4,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ p: { xs: 3, md: 5 } }}>
                            <Typography
                                variant="h2"
                                fontWeight="800"
                                sx={{
                                    mb: 2,
                                    background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    WebkitBackgroundClip: 'text',
                                    textShadow: '0 2px 10px rgba(33,150,243,0.2)'
                                }}
                            >
                                Fullstack Developer
                            </Typography>

                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 3, fontWeight: 400, lineHeight: 1.6 }}
                            >
                                Hello, I'm Erick John O. Lopez, a passionate fullstack developer specializing in modern web technologies. With expertise in both frontend and backend development, I create seamless, intuitive applications that deliver exceptional user experiences while maintaining robust architecture.
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mb: 4 }}
                            >
                                Whether you need a responsive web application, API integration, or database optimization, I bring creative solutions to complex technical challenges.
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                to="/dashboard"
                                sx={{
                                    py: 1.5,
                                    px: 4,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 14px rgba(33,150,243,0.4)',
                                    '&:hover': {
                                        boxShadow: '0 6px 20px rgba(33,150,243,0.6)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Explore My Work
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-5%',
                                    left: '-5%',
                                    width: '110%',
                                    height: '110%',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(63,81,181,0.05) 70%)',
                                    zIndex: -1
                                }
                            }}
                        >
                            <Avatar
                                src="/appImg/Logo.png"
                                alt="Erick John O. Lopez"
                                sx={{
                                    width: { xs: 200, md: 320 },
                                    height: { xs: 200, md: 320 },
                                    border: '4px solid white',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default LandingPage