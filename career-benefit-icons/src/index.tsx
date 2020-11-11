import * as React from 'react';
import { render } from 'react-dom';
import {
  TextInput,
  DisplayText,
  SectionHeading,
  SelectField,
  Option,
  Typography
} from '@contentful/forma-36-react-components';
import { init, EditorExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss';
import './index.css';

interface AppProps {
  sdk: EditorExtensionSDK;
}

interface AppState {
  title?: string;
  iconName?: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      title: props.sdk.entry.fields.title.getValue(),
      iconName: props.sdk.entry.fields.iconName.getValue()
    };
  }

  onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.title.setValue(event.target.value);
  };

  onIconNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.iconName.setValue(event.target.value);
  };

  render() {
    return (
      <div className="f36-margin--l">
        <Typography>
          <DisplayText>Benefit Icon</DisplayText>
          <SectionHeading>Label</SectionHeading>
          <TextInput onChange={this.onTitleChangeHandler} value={this.state.title} />
          <SectionHeading>Icon</SectionHeading>
          <SelectField helpText="Choose an icon..." labelText="Icon" required onChange={this.onIconNameChangeHandler} value={this.state.iconName}>
            <Option value="umbrellacorp">umbrellacorp</Option>
            <Option value="pig">pig</Option>
            <Option value="bodybuilder">bodybuilder</Option>
            <Option value="tea">tea</Option>
            <Option value="train">train</Option>
            <Option value="heartbeat">heartbeat</Option>
          </SelectField>
        </Typography>
      </div>
    );
  }
}

init(sdk => {
  render(<App sdk={sdk as EditorExtensionSDK} />, document.getElementById('root'));
});
