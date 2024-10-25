import {createTheme} from '@material-ui/core/styles';
import _merge from 'lodash.merge';

const defaultTheme = () => ({
    geometry: {
        header: {
            heights: {
                min: 71,
                max: 100
            },
            result: {
                height: '37px'
            }
        },
        item: {
            // MinHeight:"700px",
            minHeight: '650px'
        },
        caption: {
            // MinHeight:"700px",
            padding: {
                lg: '60px',
                xs: '45px',
                main: '20px'
            }
            // Width:"calc(100% - 120px)",
        },
        indicator: {
            width: '30px',
            height: '3px',
            hitAreaHeight: '10px',
            spacer: '3px'
        },
        checkedAnswer: {
            borderRadius: '10px'
        }
    },
    palette: {
        primary: {
            light: '#009bdc',
            main: '#007cb0',
            dark: '#005f87'
        },
        secondary: {
            light: '#f57c30',
            main: '#e57834',
            dark: '#bd5715'
        },
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.87)'
        },
        background: {
            overlay: {
                start: 'rgba(0,0,0,.95)',
                startMiddle: 'rgba(0,0,0,.9)',
                endMiddle: 'rgba(0,0,0,.85)',
                end: 'rgba(0,0,0,.75)'
            },
            checkedAnswer: 'rgba(255,255,255,1)'
        },
        shadows: {
            overlay: {
                lg: 'inset 1140px 0 570px -570px rgba(0,0,0,.5)',
                xs: 'inset 500px 0 250px -250px rgba(0,0,0,.5)'
            }
        }
    },
    typography: {
        allVariants: {
            color: 'rgba(255, 255, 255, 0.87)'
        },
        fontFamily: ['Lato', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        h3: {
            fontWeight: 300
        },
        h4: {
            fontWeight: 300
        },
        body1: {
            fontSize: '1.1rem'
        }
    },
    // Shape:{
    //     borderRadius:3
    // }
    transitions: {
        row: 5,
        easing: {
            ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            header: 'cubic-bezier(.23,1,.32,1)'
        },
        duration: {
            long: 600
        }
    },
    spacing: 8,
    overrides: {
        MuiCheckbox: {
            root: {
                color: 'rgba(255, 255, 255, 0.87)'
            }
        },
        MuiRadio: {
            root: {
                color: 'rgba(255, 255, 255, 0.87)'
            }
        },
        MuiButton: {
            contained: {
                '&$disabled': {
                    color: 'rgba(255, 255, 255, 0.26)',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)'
                }
            }

        },
        MuiTypography: {
            body1: {
                '& a': {
                    color: '#007cb0'
                }
            }
        }
        // MuiCssBaseline: {
        //     '@global': {
        //         // '@font-face': ['Lato'],
        //         '.Mui-disabled': {
        //             color: "rgba(255, 255, 255, 0.26)",
        //             backgroundColor: "rgba(255, 255, 255, 0.12)"
        //         }
        //
        //     },
        // },
    },
    props: {
        MuiButton: {
            disableRipple: true,
            color: 'primary',
            variant: 'contained'
        },

        MuiCheckbox: {
            disableRipple: true,
            color: 'primary'
        },
        MuiRadio: {
            disableRipple: true,
            color: 'primary'
        }
    }
});

const getTheme = userTheme => {
    const targetTheme = defaultTheme();
    return createTheme(_merge(targetTheme, userTheme));
};

export default getTheme;
