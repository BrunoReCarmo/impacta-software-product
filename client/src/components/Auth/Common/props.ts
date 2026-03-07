import { LoginInputDTO, SignUpInputDTO } from "@common/dto";
import { UseFormRegister, UseFormSetValue, UseWatchProps } from "react-hook-form";

/**
 * Combined authentication form type.
 * 
 * This merges the fields required for login and sign-up forms.
 * Useful when a single form component supports both authentication modes.
 */
export type AuthType = LoginInputDTO & SignUpInputDTO;

/**
 * Props shared by authentication form components.
 */
export interface AuthCommonComponentProps {

  /**
   * react-hook-form watch function props.
   * Used to observe form field values and react to changes.
   */
  watch?: UseWatchProps<AuthType>;

  /**
   * react-hook-form setValue function.
   * Allows programmatically updating form values.
   */
  setValue?: UseFormSetValue<AuthType>;

  /**
   * react-hook-form register function.
   * Used to register inputs into the form state and validation.
   */
  register: UseFormRegister<AuthType>;
}