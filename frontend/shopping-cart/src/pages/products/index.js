import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));


const tileData = [
       {
        title: 'Image',
        author: 'author',
       },
       {
        title: 'Image',
        author: 'author',
      },
      {
        title: 'Image',
        author: 'author',
      },
      {
        title: 'Image',
        author: 'author',
      },
      {
        title: 'Image',
        author: 'author',
      },
];


const Products = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={5}>
                    {tileData.map((tile, i) => (
                        <GridListTile key={i}>
                            <div>{tile.title}</div>
                            <div>{tile.author}</div>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    //products: state.general.authors,
})


const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
