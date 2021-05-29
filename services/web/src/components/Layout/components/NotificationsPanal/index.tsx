import { useSelector, useDispatch } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import {
  closePanal,
  deleteAllNotifications,
} from '../../../../redux/notifications/notificationActions';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import RenderNotifications from './components/RenderNotifications';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from '../../../../styles/Layout/notificationspanal.module.css';
import { notification } from 'antd';

export default function Index() {
  const dispatch = useDispatch();

  const { isPanalOpen, notifications } = useSelector(
    state => state.notifications
  );

  const close = () => dispatch(closePanal());

  const clearAllNotifications = () => dispatch();

  if (notifications.length === 0) return <></>;

  return (
    <AnimatePresence>
      {isPanalOpen && (
        <motion.div
          className={styles.container}
          initial={{ x: '+100%', opacity: 0 }}
          animate={{ x: '-2%', opacity: 1 }}
          exit={{ x: '+100%', opacity: 0 }}
          transition={{ type: 'tween' }}
        >
          <Panal
            isPanalOpen={isPanalOpen}
            notifications={notifications}
            close={close}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Panal = ({ isPanalOpen, notifications, close }) => {
  return (
    <ClickAwayListener onClickAway={close}>
      <div>
        <div className={styles.clearAllNotifications} onClick={close}>
          Clear All
        </div>
        <div className={styles.closePanal} onClick={close}>
          <KeyboardReturnIcon />
        </div>
        <div className={styles.notifications}>
          <RenderNotifications notifications={notifications} />
        </div>
      </div>
    </ClickAwayListener>
  );
};
