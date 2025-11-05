interface SubmissionStatusProps {
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  email?: string;
}

export const SubmissionStatus = ({
  isSubmitting,
  submitSuccess,
  submitError,
  email,
}: SubmissionStatusProps) => {
  if (isSubmitting) {
    return (
      <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-800">
        <p>Envoi de vos résultats en cours...</p>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
        <p className="font-medium">
          ✓ Résultats envoyés avec succès à {email}
        </p>
      </div>
    );
  }

  if (submitError) {
    return (
      <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
        <p className="font-medium">Erreur :</p>
        <p className="text-sm">{submitError}</p>
      </div>
    );
  }

  return null;
};
