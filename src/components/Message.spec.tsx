import { CheckStatus } from "@/types/checkStatus";
import { render } from "@testing-library/react";
import { Message } from "@/components/Message";

test.each([["idle" as const], ["checking" as const], ["error" as const]])(
  "renders correctly, checkStatus=%s",
  (checkStatus: CheckStatus) => {
    const { asFragment } = render(
      <Message checkStatus={checkStatus} message={"message"} />,
    );
    expect(asFragment()).toMatchSnapshot();
  },
);
