import React, { useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel/TabPanel'
import TextField from '@material-ui/core/TextField';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { a11yProps, useConversationStyles } from './ConversationStyle'
//import useLocalStorage from 'react-use-localstorage';
import useSessionStorage from "use-session-storage"
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
import * as Config from '../Context/Constants'
import ConversationLogin from './ConversationLogin'

import Snackbar from '@material-ui/core/Snackbar';
import ConfigContext from '../Context/ConfigContext';
import { emitPub, receiveSub } from '../App/API'


export default function SimpleTabs(props) {
  const classes = useConversationStyles();
  const { state, actions } = React.useContext(ConfigContext);

  const multilineRows = 20;
  const [boxVisible, setBoxVisible] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [allMenuItems, setAllMenuItems] = React.useState({
    mItem1: false,
    mItem2: false,
    mItem3: false,
  });
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const [tabValue, setTabValue] = React.useState(0);
  const firstTabRef = React.createRef();
  const secondTabRef = React.createRef();

  const [socket] = useSocket(Config.SocketURL); //port 8080
  const [room, setRoom] = useSessionStorage('room', '');
  const [id, setId] = useSessionStorage('id', '');
  const [sendMessage, setSendMessage] = React.useState('');
  const [channelMQ, setChannelMQ] = React.useState('turtle'); //exchange turtle
  const [messages, setMessages] = useImmer([]);
  const [onlineList, setOnline] = useImmer([]);

  const [pubMessage, setPubMessage] = React.useState([]);
  const [subMessage, setSubMessage] = React.useState([]);

  useEffect(() => {
    //for socket.io
    socket.connect();

    socket.on('health_check', function (data) {
      console.log(data);
    });

    if (id) {
      socket.emit('join', id, room);
    }

    socket.on('message-queue', (nick, message) => {
      setMessages(draft => {
        draft.push([nick, message])
      })
    });

    socket.on('update', message => setMessages(draft => {
      draft.push(['', message]);
    }))

    socket.on('people-list', people => {
      let newState = [];
      for (let person in people) {
        newState.push([people[person].id, people[person].nick]);
      }
      setOnline(draft => { draft.push(...newState) });
      setOpenSnackBar(true);
    });

    socket.on('add-person', (nick, id) => {
      setOnline(draft => {
        draft.push([id, nick])
      })
      setOpenSnackBar(true);
    })

    socket.on('remove-person', id => {
      setOnline(draft => draft.filter(m => m[0] !== id))
      setOpenSnackBar(true);
    })

    socket.on('chat-message', (nick, message) => {
      setMessages(draft => { draft.push([nick, message]) })
    })
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    //socket
    if (newValue === 0 || newValue === 1) {
      actions.setIsSocketMode(true);
    } else {
      //rabbitmq
      actions.setIsSocketMode(false);
    }

    if (newValue === 3) {
      //subscriber
      setBoxVisible('none');
    } else {
      setBoxVisible('');
    }
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = (value) => {
    switch (value) {
      case 'mItem1':
        setAllMenuItems({ ...allMenuItems, mItem1: true, mItem2: false, mItem3: false })
        break;
      case 'mItem2':
        setAllMenuItems({ ...allMenuItems, mItem1: false, mItem2: true, mItem3: false })
        break;
      case 'mItem3':
        setAllMenuItems({ ...allMenuItems, mItem1: false, mItem2: false, mItem3: true })
        break;
      default:
        setAllMenuItems({ ...allMenuItems })
    }

    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleSend = (e) => {
    e.preventDefault(); //Kim: suppress refresh

    if (state.isSocketMode) {
      console.log(sendMessage);
      if (sendMessage.trim() !== '') {
        socket.emit('chat-message', sendMessage, room);
        setSendMessage('');
      }
    } else {
      //create subscriber
      receiveSub(channelMQ, (subMsg) => {
        console.log('The subscriber is wating', subMsg);
      });

      //trigger publisher
      emitPub(channelMQ, sendMessage, ()=>{
        setSendMessage('');
        setPubMessage([...pubMessage, sendMessage]);
        console.log(sendMessage);
        //receive from publisher
        receiveSub(channelMQ, (subMsg) => {
          console.log(subMsg);
          setSubMessage([...subMessage, subMsg]);
        });
      });

    }
  }

  const handleMessageTyping = (e) => {
    setSendMessage(e.target.value);
  }

  const Disconnect = () => {
    socket.disconnect();
    setOnline(draft => []);
    setMessages(draft => []);
    setId('');
    socket.connect();
  }

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };


  if (id !== '') {
    return (
      <div>
        <div className={classes.root}>
          <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={handleSnackBarClose}
            message={onlineList.map(user => `>> ${user[1]}`).join('\r\n')} />
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
                <MenuItem onClick={() => handleMenuClose('mItem1')} selected={allMenuItems.mItem1}>Channel#1</MenuItem>
                <MenuItem onClick={() => handleMenuClose('mItem2')} selected={allMenuItems.mItem2}>Channel#2</MenuItem>
                <MenuItem onClick={() => handleMenuClose('mItem3')} selected={allMenuItems.mItem3}>Channel#3</MenuItem>
              </Menu>
              <Typography variant="h6" className={classes.title}>
                Socket.io / Publisher-Subscriber
              </Typography>
              <Button color="inherit" onClick={Disconnect} startIcon={<ExitToAppIcon />}>Logout</Button>
            </Toolbar>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs" centered>
              <Tab label="Chat [Host]" {...a11yProps(0)} />
              <Tab label="Chat [Participants]" {...a11yProps(1)} />
              <Tab label="Pub-Sub [Pub]" {...a11yProps(2)} />
              <Tab label="Pub-Sub [Sub]" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <Divider />
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
                style: { fontSize: '15px' }
              }}
              value={messages.map(msg => (`>> ${msg[0]}: ${msg[1]}`)
              ).join('\r\n')}
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
                style: { fontSize: '14px' }
              }}
              value={messages.map(msg => (`>> ${msg[0]}: ${msg[1]}`)
              ).join('\r\n')}
            />
          </TabPanel>
          {/* <TabPanel value={tabValue} index={2} direction={"column"}>
            <TextField
              id="outlined-multiline-static2"
              label="[Pub-Sub]"
              multiline
              rows={multilineRows}
              variant="outlined"
              fullWidth={true}
              inputRef={firstTabRef}
              inputProps={{
                style: { fontSize: '10px' }
              }}
              value={pubMessage.map(msg => (`>> ${msg[0]}`)
              ).join('\r\n')}
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
                style: { fontSize: '10px' }
              }}
              value={subMessage.map(msg => (`>> ${msg}`)
              ).join('\r\n')}
            />
          </TabPanel> */}
          <Divider />
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
                    value={sendMessage}
                    onChange={handleMessageTyping}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                    onClick={handleSend}
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
  } else {
    return (<div><ConversationLogin socket={socket} setId={setId} setRoom={setRoom} /></div>);
  }

}
