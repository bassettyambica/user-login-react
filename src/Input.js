constimport React from 'react';
import _ from 'lodash';

class Input extends React.Component {
  constructor(props) {
    super(props);
    const valid = (this.props.isValid && this.props.isValid()) || true;

    return {
      valid: valid,
      empty: _.isEmpty(this.props.value),
      focus: false,
      value: null,
      iconsVisible: !this.props.validator,
      errorMessage: this.props.emptyMessage,
      validator: this.props.validator,
      validatorVisible: false,
      type: this.props.type,
      minCharacters: this.props.minCharacters,
      requireCapitals: this.props.requireCapitals,
      requireNumbers: this.props.requireNumbers,
      //forbiddenWords: this.props.forbiddenWords,
      isValidatorValid: {
        minChars: false,
        capitalLetters: false,
        numbers: false,
        words: false,
        all: false
      },
      allValidatorValid: false
    };
  }
handleChange(event){
  this.setState({
      value: event.target.value,
      empty: _.isEmpty(event.target.value)
    });

    if(this.props.validator) {
      this.checkRules(event.target.value)
    }

    // call input's validation method
    if(this.props.validate) {
      this.validateInput(event.target.value);
    }

    // call onChange method on the parent component for updating it's state
    if(this.props.onChange) {
      this.props.onChange(event);
    }
}

  validateInput(value){
    if(this.props.validate && this.props.validate(value)){
      this.setState({
        valid: true,
        errorVisible: false
      });
    } else {
      this.setState({
        valid: false,
        errorMessage: !_.isEmpty(value) ? this.props.errorMessage : this.props.emptyMessage
      });
    }
  }

  isValid(){
    if(this.props.validate) {
      if(_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
        this.setState({
          valid: false,
          errorVisible: true
        });
      }
    }

    return this.state.valid;
  }

  handleFocus(){
    this.setState({
      focus: true,
      validatorVisible: true
    });

    // hide error when validator is active
    if(this.props.validator) {
      this.setState({
        errorVisible: false
      })
    }
  }

    render(){


    const validator;
    return (
          <div>

            <label className="input_label" htmlFor={this.props.text}>
              <span className="label_text">{this.props.text}</span>
            </label>

            <input
              {...this.props}
              placeholder={this.props.placeholder}
              className="input"
              id={this.props.text}
              defaultValue={this.props.defaultValue}
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              autoComplete="off"
            />

            <InputError
              visible={this.state.errorVisible}
              errorMessage={this.state.errorMessage}
            />

            <div className="validationIcons">
              <i className="input_error_icon" onMouseEnter={this.mouseEnterError}> <Icon type="circle_error"/> </i>
              <i className="input_valid_icon"> <Icon type="circle_tick"/> </i>
            </div>

            {validator}

          </div>
        );

    }


}

export default Input;
