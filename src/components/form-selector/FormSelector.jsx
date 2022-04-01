import Button from 'components/button/Button';
import CloseIcon from 'components/close-icon/CloseIcon';
import { useState } from 'react';

export default function FormSelector({ item, form }) {
  const [showForm, setShowForm] = useState(false);
  function deleteElement() {}
  return (
    <div>
      <CloseIcon onClick={() => deleteElement()} />
      <img
        onClick={() => setShowForm(!showForm)}
        src='assets/icons/edit-icon.png'
        alt='edit icon'
      />
      <div>{!showForm ? item : form}</div>
    </div>
  );
}
