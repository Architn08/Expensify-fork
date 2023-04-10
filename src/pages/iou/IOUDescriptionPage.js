import React, {Component} from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import TextInput from '../../components/TextInput';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import ScreenWrapper from '../../components/ScreenWrapper';
import HeaderWithCloseButton from '../../components/HeaderWithCloseButton';
import Form from '../../components/Form';
import ONYXKEYS from '../../ONYXKEYS';
import styles from '../../styles/styles';
import Navigation from '../../libs/Navigation/Navigation';
import compose from '../../libs/compose';
import * as IOU from '../../libs/actions/IOU';

const propTypes = {
    ...withLocalizePropTypes,

    /** Onyx Props */
    /** Holds data related to IOU view state, rather than the underlying IOU data. */
    iou: PropTypes.shape({
        comment: PropTypes.string,
    }),
};

const defaultProps = {
    iou: {
        comment: '',
    },
};

class IOUDescriptionPage extends Component {
    constructor(props) {
        super(props);

        this.updateComment = this.updateComment.bind(this);
    }

    /**
     * Sets the IOU comment by saving it to Onyx.
     *
     * @param {Object} value
     * @param {String} value.iouComment
     */
    updateComment(value) {
        IOU.setIOUComment(value.iouComment);
        Navigation.goBack();
    }

    render() {
        return (
            <ScreenWrapper includeSafeAreaPaddingBottom={false}>
                <HeaderWithCloseButton
                    title={this.props.translate('iOUConfirmationList.whatsItFor')}
                    shouldShowBackButton
                    shouldShowCloseButton={false}
                    onBackButtonPress={Navigation.goBack}
                />
                <Form
                    style={[styles.flexGrow1, styles.ph5]}
                    formID={ONYXKEYS.FORMS.IOU_DESCRIPTION_FORM}
                    onSubmit={this.updateComment}
                    submitButtonText={this.props.translate('common.save')}
                    validate={() => ({})}
                    enabledWhenOffline
                >
                    <View style={styles.mb4}>
                        <TextInput
                            inputID="iouComment"
                            name="ioucomment"
                            defaultValue={this.props.iou.comment}
                        />
                    </View>
                </Form>
            </ScreenWrapper>
        );
    }
}

IOUDescriptionPage.propTypes = propTypes;
IOUDescriptionPage.defaultProps = defaultProps;

export default compose(
    withLocalize,
    withOnyx({
        iou: {key: ONYXKEYS.IOU},
    }),
)(IOUDescriptionPage);
