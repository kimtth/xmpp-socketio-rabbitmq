import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel/TabPanel'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
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
  }
}));


export default function SimpleTabs(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [boxVisible, setBoxVisible] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const multilineRows = 20;

  const [firstTabValue, setFirstTabValue] = React.useState('');
  const [secondTabValue, setSecondTabValue] = React.useState('');
  const firstTabRef = React.createRef();
  const secondTabRef = React.createRef();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if(newValue === 3){
      setBoxVisible('none');
    }else{
      setBoxVisible('');
    }
  };

  const handleChange = e => {
    if (e.target === firstTabRef.current){
      setFirstTabValue(e.target.value);
    }else if(e.target === secondTabRef.current){
      setSecondTabValue(e.target.value);
    }
  }

  const saveTextArea = () =>{
    let title = '1.[English -> 日本語] \n'
    let save_data = title;
    save_data += firstTabValue;
    save_data += '\n';
    title = '2.[日本語 -> English] \n'
    save_data += title;
    save_data += secondTabValue;

    const timestampNow = Date().now;
    const timestamp = new Intl.DateTimeFormat('ja-JP', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestampNow)

    if(save_data){
      const element = document.createElement("a");
      const file = new Blob([save_data], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = 'voice-text-save-'+ timestamp + '.txt';
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  return (
    <div>
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={handleMenuClick} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openMenu}
                onClose={handleMenuClose}
              >
              <MenuItem onClick={handleMenuClose}>Channel#1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Channel#2</MenuItem>
              <MenuItem onClick={handleMenuClose}>Channel#3</MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              Chat Server / Publisher-Subscriber
            </Typography>
          </Toolbar>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs" centered>
              <Tab label="Chat [Host]" {...a11yProps(0)} />
              <Tab label="Chat [Participants]" {...a11yProps(1)} />
              <Tab label="Pub-Sub [Pub]" {...a11yProps(2)} />
              <Tab label="Pub-Sub [Sub]" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <Divider/>
        <TabPanel value={tabValue} index={0} direction={"column"}>
            <TextField
                id="outlined-multiline-static0"
                label="[Chat]"
                multiline
                rows={multilineRows}
                variant="outlined"
                fullWidth={true}
                inputRef={firstTabRef}
                inputProps={{
                  style: {fontSize: '10px'} 
                }}
                value={firstTabValue}
                onChange={handleChange}
            />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
            <TextField
                id="outlined-multiline-static1"
                label="[Chat]"
                multiline
                rows={multilineRows}
                variant="outlined"
                fullWidth={true}
                inputRef={secondTabRef}
                inputProps={{
                  style: {fontSize: '10px'} 
                }}
                value={secondTabValue}
                onChange={handleChange}
            />
        </TabPanel>
        <TabPanel value={tabValue} index={2} direction={"column"}>
            <TextField
                id="outlined-multiline-static2"
                label="[Pub-Sub]"
                multiline
                rows={multilineRows}
                variant="outlined"
                fullWidth={true}
                inputRef={firstTabRef}
                inputProps={{
                  style: {fontSize: '10px'} 
                }}
                value={firstTabValue}
                onChange={handleChange}
            />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
            <TextField
                id="outlined-multiline-static3"
                label="[Pub-Sub]"
                multiline
                rows={multilineRows}
                variant="outlined"
                fullWidth={true}
                inputRef={secondTabRef}
                inputProps={{
                  style: {fontSize: '10px'} 
                }}
                value={secondTabValue}
                onChange={handleChange}
            />
        </TabPanel>
        <Divider/>
        <form>
        <Box component="span" className={classes.gridMargin} display={boxVisible}>
          <Grid container>
            <Grid item xs={11}>
              <TextField 
                id="basic" 
                className={classes.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<SendIcon/>}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
        </form>
    </div>
      
    </div>
  );
}
