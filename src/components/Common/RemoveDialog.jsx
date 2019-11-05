import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useActOnResource } from '../../hooks';
import LoadingButton from './LoadingButton';

export default function RemoveDialog({
  onClose,
  onDestroy,
  visible,
  resource,
}) {
  const { t } = useTranslation();
  const title = t('confirmations.areYouSure');

  const [destroying, handleDestroyConfirmClick] = useActOnResource(
    useCallback(() => onDestroy(resource.id).then(onClose), [
      onClose,
      onDestroy,
      resource,
    ]),
  );

  return (
    <Dialog open={visible} onClose={onClose} aria-labelledby={title}>
      <DialogTitle id={title}>{title}</DialogTitle>
      <DialogActions>
        <LoadingButton
          color="primary"
          loading={destroying}
          onClick={handleDestroyConfirmClick}
        >
          {t('confirmations.confirm')}
        </LoadingButton>
        <Button onClick={onClose}>{t('confirmations.cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
}

RemoveDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  resource: PropTypes.shape({ id: PropTypes.string.isRequired }),
  visible: PropTypes.bool.isRequired,
};

RemoveDialog.defaultProps = {
  resource: undefined,
};
