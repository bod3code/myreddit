import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  card: {
      margin: theme.spacing(1,1,1,1)
  },
  title: {
      fontSize: 14,
  }
}));

const DataCards = (props) => {
  const classes = useStyles();

    const data = props.data;
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
    };

    return(
    data.hits.map(item => (
    <Card key={item.url} className={classes.card} raised={true}>
  <CardContent>
    <Typography className={classes.title} color="textSecondary" gutterBottom>
    {item.author}
    </Typography>
    <Typography variant="h5" component="h2">
    {item.title}
    </Typography>
    <Typography color="textSecondary">
    {formatDate(item.created_at)}
    </Typography>
    <Typography variant="body2" component="p">
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small" href={item.url}>Learn More</Button>
  </CardActions>
</Card>
    )
 ))};

 export default DataCards;