import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Form } from 'formik';
import { submitButtonProps } from '../../lib/forms';
import SubmitButton from './SubmitButton';

export default function DialogForm({
  children,
  onClose,
  title,
  visible,
  ...rest
}) {
  const { t } = useTranslation();
  return (
    <Dialog open={visible} onClose={onClose} aria-labelledby={title}>
      <Form>
        <DialogTitle id={title}>{title}</DialogTitle>
        <DialogContent>{visible ? children : null}</DialogContent>
        <DialogActions>
          <SubmitButton {...submitButtonProps(rest)} text={title} />
          <Button onClick={onClose}>{t('confirmations.cancel')}</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}

DialogForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
