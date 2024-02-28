<h1 align="center">
   🚀 React NPM Packege For FACEKI Blaze 3.0 🚀
</h1>

<p align="center">
  <strong>Faceki Blaze Know Your Customer</strong><br>
</p>


# Faceki React KYC Package - Documentation

## Installation

You can install the `@faceki/blaze-kyc-react-sdk` package using npm or yarn:

```sh
npm install @faceki/blaze-kyc-react-sdk
# or
yarn add @faceki/blaze-kyc-react-sdk
```


## Usage

To use the `<FacekiSDK>` component in your React application, follow these steps:

1. Import the component at the top of your component file:

```jsx
import React from "react";
import FacekiSDK from "@faceki/blaze-kyc-react-sdk";
```

2. Configure the SDK by providing the necessary props:

```jsx
const App = () => {
  const sdkConfig = {
    link="your-generated-link", 
    theme: {
      mainColor: "#FF5733",
      secondaryColor: "#2ECC71",
      backgroundColor: "#F4F4F4",
      cardBackgroundColor: "#FFFFFF",
      headingTextColor: "#333333",
      secondaryTextColor: "#777777",
      secondaryBorderColor: "#DDDDDD",
      iconFillColor: "#555555",
      iconBorderColor: "#888888",
      iconTextColor: "#FFFFFF",
      logo: "https://example.com/logo.png",
      disableGuidance: false,
      failedText: "Operation failed. Please try again.",
      successText: "Operation successful!",
      buttonbg: "#F8B427",
      textBg: "#EFEFEF",
      verificationProcessingText: "Processing verification...",
      externalTermsUrl:"https://faceki.com"
    },
    onSuccess: (data) => {
      console.log("SDK operation successful:", data);
    },
    onFail: (data) => {
      console.error("SDK operation failed:", data);
    },
  };

  return <FacekiSDK {...sdkConfig} />;
};

export default App;
```

## NextJS

nextJSImages should be True for NextJS Applications

```
const App = () => {
  const sdkConfig = {
    link="your-generated-link", 
    theme: {
      nextJSImages: true  
    },
    onSuccess: (data) => {
      console.log("SDK operation successful:", data);
    },
    onFail: (data) => {
      console.error("SDK operation failed:", data);
    },
  };

  return <FacekiSDK {...sdkConfig} />;
};

export default App;

```


## Configurable Props

The `<FacekiSDK>` component accepts the following configurable props:

- `link` (required): Your generated link Id from https://docs.faceki.com/api-integration/verification-apis/generate-kyc-link
```
{
    "responseCode": 0,
    "data": "LINKID",  // This Value will be used here
    "url": "Verification URL"
}
```
 .
- `theme` (optional): An object to customize the visual appearance of the SDK. It includes properties like `mainColor`, `secondaryColor`, etc.
- `onSuccess` (optional): A callback function to be called when the SDK operation is successful. It receives data as a parameter.
- `onFail` (optional): A callback function to be called when the SDK operation fails. It receives data as a parameter.

### Theme Configuration

The `theme` object can be customized with the following properties:

- `mainColor`: Main color used in the theme.
- `secondaryColor`: Secondary color for the theme.
- `backgroundColor`: Background color of the SDK component.
- `cardBackgroundColor`: Background color of cards within the SDK.
- `headingTextColor`: Color of text used in headings.
- `secondaryTextColor`: Color of secondary text.
- `secondaryBorderColor`: Color of secondary borders.
- `iconFillColor`: Fill color for icons.
- `iconBorderColor`: Border color for icons.
- `iconTextColor`: Color of text within icons.
- `logo`: URL for a custom logo image.
- `disableGuidance`: A boolean to disable guidance (if applicable).
- `failedText`: Text to display on failure.
- `successText`: Text to display on success.
- `buttonbg`: Background color for buttons.
- `textBg`: Background color for text elements.
- `verificationProcessingText`: Text to display during verification processing.
- `externalTermsUrl`: External Terms and Conditional URL. If you need user to agree on your terms and condition before they continue verification
- `nextJSImages`: if you are using SDK on NEXTJS App, make sure to pass it as True, if you are facing issue with images.





## Example

Here's an example of how you can use the `<FacekiSDK>` component with minimal configuration:

```jsx
<FacekiSDK link="your-generated-link" />
```

For advanced customization, you can provide additional theme properties and callback functions as needed.

Feel free to explore and customize your `<FacekiSDK>` integration! 👩‍💻🚀


## Change Log

* 2024-02-28 -- 1.0.4
  * Added Support For NextJS


* 2024-02-28 -- 1.0.3
  * Read Me Updates

* 2024-02-28 -- 1.0.2
  * Added External Terms and Condition URL. 
  * Added Quality Check
  * Added Link Verification Replaced Client ID and Secret For Better Security
