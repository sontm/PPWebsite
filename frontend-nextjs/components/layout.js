import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PrimarySearchAppBar from './appbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function Layout({ children, home }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PrimarySearchAppBar />
        </Grid>

        <Grid item xs={12}>
          {children}
        </Grid>

        <Grid item xs={12}>
          <div className={styles.footer}>
          <Grid container spacing={3}>
            <Grid item xs={2} />
            <Grid item xs={4}>
              <a href="#">
                <h4 style={{color: "white"}}>YamaStack</h4>
              </a>
              <p>
                  Ứng Dụng cho Cuộc Sống!
              </p>
            </Grid>
            <Grid item xs={4}>
              <h3>
                    Tải Về
              </h3>
              <ul>
                <li>
                    <a href="https://play.google.com/store/apps/details?id=com.sansan.VehicleCMS" target="_blank">
                    Tải Về từ Android Google Play

                    </a>
                </li>
                <li><a href="https://apps.apple.com/app/id1498085260" target="_blank">
                Tải Về từ Apple App Store
                    </a>
                </li>
              </ul>
            </Grid>
          </Grid>
          <Grid item xs={2} />
          
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
