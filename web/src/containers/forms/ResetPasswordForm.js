import { Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaLock } from "react-icons/fa";

import InputField from "~/components/InputField/InputField";
import { resetPassSchema } from "~/validation/auth";
import { resetPasswordValues } from "~/containers/forms/const";
import BaseButton from "~/components/Button/Button";
import { SUCCESS_MSGS } from "~/consts/messages";
import { useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "~/redux/api/auth-api";
import useAlert from "~/hooks/use-alert";
import { colors } from "~/theme/config";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { setAlert } = useAlert();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: resetPasswordValues,
    validationSchema: resetPassSchema,
    onSubmit: (values) => {
      resetPassword({ resetToken, ...values })
        .unwrap()
        .then(() => {
          resetForm();
          setAlert(SUCCESS_MSGS.RESET_PASS_SUCCESS, colors.success);
        })
        .catch(({ data }) => setAlert(data.message, colors.error));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="password"
        label="Your new password"
        placeholder="your_password"
        contentLeft={<FaLock />}
        isPassword
        value={values.password}
        error={Boolean(touched.password && errors.password)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.password && errors.password}
      ></InputField>
      <Row justify="center">
        <BaseButton block loading={isLoading} text="Confirm" />
      </Row>
    </form>
  );
};

export default ResetPasswordForm;
