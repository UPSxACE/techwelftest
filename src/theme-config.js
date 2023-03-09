const themeConfig = {
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: 'black',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#284852',
          },
          '&:focus .MuiOutlinedInput-notchedOutline': {
            borderColor: '#284852',
          },
          '&:focus-visible .MuiOutlinedInput-notchedOutline': {
            borderColor: '#284852',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          transition: 'border-bottom-color 200ms!important',
          transitionTimingFunction: 'none!important',
          '&:hover:before': {
            borderBottom: '1px solid black!important',
            transition: 'border-bottom-color 200ms!important',
            transitionTimingFunction: 'none!important',
          },
        },
        input: {
          color: 'black',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#336677', // OK1st color '#ff3b3b', // red
      components: '#1a746c', // dark grey
      components2: '#ffffff', // white
      components3: '#535353', // black
      components4: '#f2f2f2', // light grey
      special1: '#284852', // dark green
      special2: '#1a746c', // green
      special3: '#ed7575', // red
      //special: '#336677', // OK1st color //'#ff4c4c', // red
      links: '#0072e5', // blue
      gradientAngle: '139',
      darkBorder: '#c6c6c6',
    },
    secondary: {
      main: '#3f51b5', // blue
    },
    black: '#000000', // black
    white: '#ffffff', // white
    text: {
      primary: '#ffffff', // white
      secondary: '#000000', // black
      special: '#1a746c', //green
      special_old: '#336677', //OK1st color '#ff4c4c', // red
    },
  },
};

export default themeConfig;
