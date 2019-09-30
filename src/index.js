import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function DenseAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky" color="secondary">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        Photos
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export function SwitchToogle(props) {
    return (
        <Switch
            checked={props.state}
            onChange={props.onChange("checkedA")}
            value="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            disabled={props.disabled}
        />
    );
}

class Input extends React.Component {
    render() {
        return (
            <TextField
                id="outlined-with-placeholder"
                label={this.props.label}
                placeholder={this.props.placeholder}
                margin="normal"
                variant="outlined"
                value={this.props.value}
                onInput={this.props.onInput(this.props.id)}
            />
        );
    }
}

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewList: false,
            dense: false,
            setDense: false,
            secondary: true,
        }
    }
    render() {
        if (this.props.viewTrack) {
            return (
                <div className=''>
                    <List dense={this.state.dense}>
                        {generate(
                            <ListItem>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={this.state.secondary ? 'Secondary text' : null}
                                />
                            </ListItem>,
                        )}
                    </List>
                </div>
            );
        }
        return null;
    }
}

class First extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swicthToogle: false,
            checkedA: false,
            inputArtist: '',
            inputSong: '',
            inputFragment: '',
        }
    }
    handleChangeSwicth = name => event => {
        if (event && event.target) {
            this.setState({ [name]: event.target.checked });
        }
    };
    handleChangeInput = name => event => {
        this.setState({ [name]: event.target.value });
    };
    searchSongs = () => {
        console.log('Buscar Las canciones Manao');
        const headers = new Headers();

        const miInit = {
            method: 'GET',
            headers: headers,
            mode: 'no-cors',
            cache: 'default'
        };

        let url = 'http://api.musixmatch.com/ws/1.1/track.search?';
        let urlContainAnyParam = false;

        if (this.state.inputArtist !== '') {
            console.log(this.state.inputArtist);
            url = `${url}q_artist=${this.state.inputArtist}`;
            urlContainAnyParam = true;
        }
        if (this.state.inputSong !== '') {
            console.log(this.state.inputSong);
            url = (urlContainAnyParam) ? `${url}&q_track=${this.state.inputSong}` : `${url}q_track=${this.state.inputSong}`;
            urlContainAnyParam = true;
        }
        if (this.state.inputFragment !== '') {
            console.log(this.state.inputFragment);
            url = (urlContainAnyParam) ? `${url}&q_lyrics=${this.state.inputFragment}` : `${url}q_lyrics=${this.state.inputFragment}`;
        }
        url = `${url}&page=4&page_size=6&apikey=b57a77ea0247711d490ed98a0ac7de40`;

        fetch(url, miInit)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((jsonValues) => {
                console.log(jsonValues);
            })
            .catch((error) => {
                console.log(error.message);
            })
    };
    render() {
        return (
            <div className="">
                <DenseAppBar />
                <div className="search">
                    <Input label="Artist" id="inputArtist" onInput={(name) => this.handleChangeInput(name)} placeholder="Artist name" value={this.state.inputArtist} />
                    <Input label="Song" id="inputSong" onInput={(name) => this.handleChangeInput(name)} placeholder="Song name" value={this.state.inputSong} />
                    <Input label="Fragment" id="inputFragment" onInput={(name) => this.handleChangeInput(name)} placeholder="Fragment of the song" value={this.state.inputFragment} />
                </div>
                <div className="track-list">
                    {/* <SwitchToogle onChange={(name) => this.handleChangeSwicth(name)}
                        state={this.state.checkedA}
                        disabled={
                            !(this.state.inputArtist !== ''||
                            this.state.inputSong !== '' ||
                            this.state.inputFragment !== '')
                        }
                    /> */}
                    <Button id='search'
                        onClick={() => this.searchSongs()}
                        disabled={
                            !(this.state.inputArtist !== '' ||
                                this.state.inputSong !== '' ||
                                this.state.inputFragment !== '')
                        }
                        color="secondary">Search
                    </Button>
                    <TrackList viewTrack={this.state.checkedA} />
                    <ol>{}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <First />,
    document.getElementById('root')
);

function generate(element) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}