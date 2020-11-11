import * as React from 'react';
import { render } from 'react-dom';
import {
  TextInput,
  SectionHeading,
  SelectField,
  Option,
  Typography,
  Button,
  TextLink,
} from '@contentful/forma-36-react-components';
import { init, EditorExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss';
import './index.css';

interface AppProps {
  sdk: EditorExtensionSDK;
}

interface BenefitIcon {
  title?: string;
  iconName?: string;
}

interface IconEditorProps {
  benefitIcon: BenefitIcon
  index: number
  updateIcon(benefitIcon: BenefitIcon | null, index: number): void
}

function IconEditor({benefitIcon, index, updateIcon}: IconEditorProps): JSX.Element {
  const [title, setTitle] = React.useState<string>(benefitIcon?.title || '')
  const [iconName, setIconName] = React.useState<string | undefined>(benefitIcon.iconName || 'umbrellacorp')

  React.useEffect(() => {
    benefitIcon.title = title
    benefitIcon.iconName = iconName
    updateIcon(benefitIcon, index)
  }, [title, iconName, benefitIcon])

  return (
    <Typography>
    <SectionHeading>Label</SectionHeading>
    <TextInput onChange={e => setTitle(e.target.value)} value={title} />
    <SelectField labelText="Icon" required 
      onChange={e => setIconName((e.target as HTMLSelectElement).value)} value={iconName}>
      <Option value="umbrellacorp">umbrellacorp</Option>
      <Option value="pig">pig</Option>
      <Option value="bodybuilder">bodybuilder</Option>
      <Option value="tea">tea</Option>
      <Option value="train">train</Option>
      <Option value="heartbeat">heartbeat</Option>
    </SelectField>
    <TextLink onClick={() => updateIcon(null, index)}>Remove</TextLink>
  </Typography>
  )
}

function App({ sdk }: AppProps): JSX.Element {
  const icons = React.useRef<BenefitIcon[]>(sdk.entry.fields.benefitIcons.getValue() || [{}])
  const [, setForceUpdate] = React.useState(new Date())

  React.useEffect(() => {

  }, [])

  const updateIcon = React.useCallback((benefitIcon: BenefitIcon, index: number) => {
    if (benefitIcon !== null) {
      icons.current[index] = benefitIcon
    } else {
      icons.current = [...icons.current.slice(0, index), ...icons.current.slice(index + 1)]
    }
    sdk.entry.fields.benefitIcons.setValue(icons.current)
  }, [])

  return (
    <div className="f36-margin--l">
      {icons.current.map((benefitIcon, index) => (
        <IconEditor key={`icon-${index}`} benefitIcon={benefitIcon} index={index} updateIcon={updateIcon} />
      ))}
      <TextLink onClick={() => {
        icons.current = [...icons.current, {}]
        setForceUpdate(new Date())
      }}>Add icon and label</TextLink>
    </div>
  )
}

init(sdk => {
  const extension = sdk as EditorExtensionSDK
  console.log("LC!! editor " + Object.keys(extension.parameters.invocation || {}))

  render(<App sdk={extension} />, document.getElementById('root'))
})
