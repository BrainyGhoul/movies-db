import React, { useState, useEffect } from 'react';
import api from "../axios";
import "./watchlist_icon.css";
import {
    TextField,
    Button
} from "@material-ui/core";
import { 
    Dialog,
    DialogTitle,
    DialogContent
} from '@mui/material';
import BookmarkAdd from "@material-ui/icons/Bookmark";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

// gotta fix the button color

const filter = createFilterOptions();

const WatchlistIcon = (props) => {

    const [allWatchlists, setAllWatchlists] = useState([]);
    const [currentWatchlist, setCurrentWatchlist] = useState("");
    // the text on the button
    const [addOrRemove, setaddOrRemove] = useState("Add");
    // setting the color in materialui
    const [buttonVariant, setButtonVariant] = useState("contained");
    const [buttonDisable, setButtonDisable] = useState(true);
    const [watchlistsAdded, setwatchlistsAdded] = useState([]);
    const [open, setOpen] = useState(false);
    
    

    const add_to_watchlist = (event) => {
        api.post(JSON.parse(window.localStorage.getItem("api_endpoints"))["watchlists"] + "add",
            {
                title_id: props.title_id,
                watchlist: currentWatchlist.name
            }
        );
        
        let watchlists = [...watchlistsAdded, currentWatchlist.name]
        if (watchlistsAdded.includes(currentWatchlist.name)) {
            watchlists = watchlistsAdded.filter(watchlist => watchlist != currentWatchlist.name)
        }
        
        
        button_style(watchlists, currentWatchlist);
        event.preventDefault();
    }

    const button_style = (watchlists, newValue) => {
        if (newValue.name === "") {
            setButtonDisable(true);
            return;
        } else if (watchlists.includes(newValue.name)) {
            setaddOrRemove("Remove");
            setButtonVariant("outlined");
        } else {
            setaddOrRemove("Add");
            setButtonVariant("contained");
        }
        setButtonDisable(false);
        setwatchlistsAdded(watchlists);
    }
    
    const change_watchlist = (event, newValue) => {
        if (typeof newValue === 'string') {
            setCurrentWatchlist({
            name: newValue,
            });
        } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setCurrentWatchlist({
            name: newValue.inputValue,
            });
            newValue = newValue.inputValue
        } else {
            setCurrentWatchlist(newValue);
        }
        button_style(watchlistsAdded, newValue);
    }

    useEffect(() => {
        api.get(JSON.parse(window.localStorage.getItem("api_endpoints"))["watchlists"] + "get")
        .then(response => {
            setAllWatchlists(response.data);

            // parse all the watchlists in which the title exists
            let watchlist_names = response.data?.map(( watchlist ) => {
                if (watchlist?.titles.map((title) => title.id).includes(props.title_id)){
                    return watchlist.name;
                } else{
                    return null;
                }

            });
            setwatchlistsAdded(watchlist_names.filter(n => n));
            
        });
    }, []);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
        // button_style();
    }

    const getOptionLabel = (option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
    }
    
    // depending on where it is, its either a button or a watchlist icon
    var trigger = <BookmarkAdd onClick={handleOpen} className="slider__bookmark-flag" color="primary"/>
    if (props.type == "button") {
        trigger = <div className="slider__watchlist-button">
                    <Button onClick={handleOpen}>WatchList</Button>
                </div>
    }


    return (
        <> 
            { window.localStorage.getItem("access_token") ?
                <>
                    {trigger}
                    <Dialog className="popup" open={open} onClose={handleClose} fullWidth>
                        <DialogTitle>Add to watchlist</DialogTitle>
                        <DialogContent>
                            <form onSubmit={add_to_watchlist}>
                                <Autocomplete 
                                    filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                            
                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some((option) => inputValue === option.name);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push({
                                        inputValue,
                                        name: `Create "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                    }}
                                
                                    value={currentWatchlist} 
                                    onChange={change_watchlist} 
                                    freeSolo
                                    selectOnFocus
                                    clearOnBlur
                                    handleHomeEndKeys
                                    getOptionLabel={getOptionLabel}
                                    renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                    options={allWatchlists}
                                    renderInput={(params) => <TextField {...params} variant="outlined" type="text" list="watchlists" label="Watchlist Name" margin="dense" fullWidth />}
                                />

                                <Button color="primary" variant={buttonVariant} type="submit" disabled={buttonDisable}>{addOrRemove}</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </>:
                <></>
            }
        </>
    )
}

export default WatchlistIcon;