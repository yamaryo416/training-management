import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "#f8fafc",
                color: "#1e293b",
                fontSize: "15px"
            }
        }
    },
    colors: {
        brand: {
            50: '#fef3c7',
            100: '#fde68a',
            200: '#fcd34d',
            300: '#fbbf24',
            400: '#f59e0b',
            500: '#ef7d00',
            600: '#db6300',
            700: '#c05621',
            800: '#92400e',
            900: '#78350f',
        },
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
        }
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: '600',
                borderRadius: 'lg',
            },
            variants: {
                solid: {
                    bg: 'brand.500',
                    color: 'white',
                    _hover: {
                        bg: 'brand.600',
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    },
                    transition: 'all 0.2s',
                },
                outline: {
                    borderColor: 'brand.500',
                    color: 'brand.500',
                    _hover: {
                        bg: 'brand.50',
                        transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                },
                ghost: {
                    color: 'gray.600',
                    _hover: {
                        bg: 'gray.100',
                        color: 'brand.500',
                    },
                    transition: 'all 0.2s',
                }
            }
        },
        Card: {
            baseStyle: {
                container: {
                    bg: 'white',
                    borderRadius: 'xl',
                    boxShadow: 'sm',
                    _hover: {
                        boxShadow: 'md',
                        transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.3s',
                }
            }
        },
        Modal: {
            baseStyle: {
                dialog: {
                    bg: 'white',
                    borderRadius: 'xl',
                    boxShadow: 'xl',
                }
            }
        },
        Input: {
            variants: {
                outline: {
                    field: {
                        borderColor: 'gray.200',
                        _hover: {
                            borderColor: 'brand.300',
                        },
                        _focus: {
                            borderColor: 'brand.500',
                            boxShadow: '0 0 0 1px brand.500',
                        }
                    }
                }
            }
        }
    }
});

export default theme;