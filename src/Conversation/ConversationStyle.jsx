import { makeStyles } from '@material-ui/core/styles';

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const useConversationStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    width: '90%',
    margin: '2px 0px 2px 20px'
  },
  gridMargin:{
    margin: '1px'
  },
  button: {
    margin: '-3em'
  },
  title: {
    flexGrow: 1,
  },
}));