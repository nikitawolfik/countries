import React, { Fragment, PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import DefaultModal from 'react-modal';

import Button from '../Button';
//  import Card from '../Card';
import './styles.css';
import styles from './styles.module.scss';

DefaultModal.setAppElement(document.getElementById('modal-root'));

const getParent = () => (document.querySelector('#modal-root'));

const Modal = ({
  autoclose,
  submit,
  children,
  title,
  cardClassName,
  renderTitle,
  withContent,
  content,
  hideCloseButton,
  closeButtonText,
  closeClassName,
  hideSubmitButton,
  submitButtonText,
  disableSubmit,
  submitClassName,
}) => {
  const [active, setActive] = React.useState(false);
  const [params, setParams] = React.useState();
  const [titleState, setTitle] = React.useState('');
  const timer = React.useRef();

  const toggleModal = ({ params, title } = {}) => {
    if (autoclose && !active) {
      timer.current = setTimeout(closeModal, 2500);
    }

    setActive(!active);
    setParams(params);
    setTitle(title);
  };

  const closeModal = () => {
    if (autoclose) {
      clearTimeout(timer.current);
    }

    setActive(false);
  };

  const submitModal = () => {
    toggleModal();
    submit(params);
  }

  return (
    <Fragment>
      {children ? children(toggleModal) : null}
      <DefaultModal
        closeTimeoutMS={250}
        parentSelector={getParent}
        isOpen={active}
        overlayClassName={styles.overlay}
        className={styles.container}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick
      >
        <div
          className={cx(cardClassName, styles.card)}
        >
          <div className={styles.wrapper}>
            {title && (
              <h3 className={styles.title}>{title || titleState}</h3>
            )}

            {renderTitle && (
              renderTitle
            )}

            {withContent && (
              content
            )}

            <div className={styles.buttonWrapper}>
              {!hideCloseButton && (
                <Button
                  transparent
                  medium
                  title={closeButtonText}
                  onClick={closeModal}
                  className={closeClassName}
                />
              )}
              {!hideSubmitButton && (
                <Button
                  primary
                  medium
                  title={submitButtonText}
                  onClick={submitModal}
                  disabled={disableSubmit}
                  className={cx(
                    styles.submitButton,
                    { [styles.wideButton]: submitButtonText.length >= 15 },
                    submitClassName,
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </DefaultModal>
    </Fragment>
  );
};

Modal.propTypes = {
  submit: PropTypes.func,
  title: PropTypes.string,
  renderTitle: PropTypes.node,
  children: PropTypes.func,
  hideSubmitButton: PropTypes.bool,
  hideCloseButton: PropTypes.bool,
  submitButtonText: PropTypes.string,
  closeButtonText: PropTypes.string,
  autoclose: PropTypes.bool,
  withContent: PropTypes.bool,
  disableSubmit: PropTypes.bool,
  content: PropTypes.node,
  submitClassName: PropTypes.string,
  closeClassName: PropTypes.string,
  cardClassName: PropTypes.string,
};

Modal.defaultProps = {
  submitButtonText: 'Подтвердить',
  closeButtonText: 'Закрыть',
  withContent: false,
};

export default Modal;
