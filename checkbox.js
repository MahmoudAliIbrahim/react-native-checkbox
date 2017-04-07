import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';

const PropTypes = React.PropTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 26,
    height: 26,
  },
  labelContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 15,
    color: 'grey',
  },
});

const CB_ENABLED_IMAGE = require('./cb_enabled.png');
const CB_DISABLED_IMAGE = require('./cb_disabled.png');

class CheckBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      internalChecked: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    if (this.props.onChange && typeof this.props.checked === 'boolean') {
      this.props.onChange(this.props.checked);
    } else {
      const internalChecked = this.state.internalChecked;

      if (this.props.onChange) {
        this.props.onChange(internalChecked);
      }
      this.setState({
        internalChecked: !internalChecked,
      });
    }
  }

  render() {
    let source;
    let container = (
            <View style={this.props.containerStyle || styles.container}>
                <Image
                    source={source}
                    style={this.props.checkboxStyle || styles.checkbox}
                />
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                </View>
            </View>
        );

    if (typeof this.props.checked === 'boolean') {
      source = this.props.checked ? this.props.checkedImage : this.props.uncheckedImage;
    } else {
      source = this.state.internalChecked ? this.props.checkedImage : this.props.uncheckedImage;
    }


    if (this.props.labelBefore) {
      container = (
              <View
                  style={this.props.containerStyle || [styles.container, styles.flexContainer]}
              >
                  <View style={styles.labelContainer}>
                      <Text
                          numberOfLines={this.props.labelLines}
                          style={[styles.label, this.props.labelStyle]}
                      >
                        {this.props.label}
                      </Text>
                  </View>
                  <TouchableWithoutFeedback onPress={this.onChange}>
                    <Image
                        source={source}
                        style={[styles.checkbox, this.props.checkboxStyle]}
                    />
                  </TouchableWithoutFeedback>
              </View>
          );
    } else {
      container = (
              <View style={[styles.container, this.props.containerStyle]}>
                <TouchableWithoutFeedback onPress={this.onChange}>
                  <Image
                      source={source}
                      style={[styles.checkbox, this.props.checkboxStyle]}
                  />
                </TouchableWithoutFeedback>
                  <View style={styles.labelContainer}>
                    <Text
                        numberOfLines={this.props.labelLines}
                        style={[styles.label, this.props.labelStyle]}
                    >
                      {this.props.label}
                    </Text>
                  </View>
              </View>
          );
    }

    return (
          <View
              style={styles.flexContainer}
              underlayColor={this.props.underlayColor}
          >
              {container}
          </View>
    );
  }
}

CheckBox.propTypes = {
  checkboxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
  checked: PropTypes.bool,
  checkedImage: PropTypes.number,
  containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
  label: PropTypes.string,
  labelBefore: PropTypes.bool,
  labelLines: PropTypes.number,
  labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
  onChange: PropTypes.func,
  uncheckedImage: PropTypes.number,
  underlayColor: PropTypes.string,
};

CheckBox.defaultProps = {
  checked: null,
  checkedImage: CB_ENABLED_IMAGE,
  label: 'Label',
  labelBefore: false,
  labelLines: 1,
  uncheckedImage: CB_DISABLED_IMAGE,
  underlayColor: 'white',
};

module.exports = CheckBox;
