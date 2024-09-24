import Modal from "./Modal";
import Input from "./Input";
import ButtonPomodoro from "./ButtonPomodoro";

export default function EmailLogin() {
  return (
    <Modal >
      <div >
        <h2 >Pease Input Your Email</h2>
        <div >
          <Input placeholder="example@email.com" />
        </div>
        <div >
          <ButtonPomodoro icon="email">Send Magic Link</ButtonPomodoro>
        </div>
      </div>
    </Modal>
  );
}
