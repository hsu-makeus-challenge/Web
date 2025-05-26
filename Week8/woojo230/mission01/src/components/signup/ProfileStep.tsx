import { useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '../../schemas/signupSchema';

interface ProfileStepProps {
  onComplete: (nickname: string, profileImage: File | null) => void;
}

const ProfileStep = ({ onComplete }: ProfileStepProps) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: '',
    },
    mode: 'onBlur',
  });

  const nickname = watch('nickname');

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.match('image.*')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      setProfileImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete(data.nickname, profileImage);
    }, 1000);
  };

  const isButtonEnabled = isValid && isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

        <div
          onClick={handleImageClick}
          className="relative w-50 h-50 rounded-full border-2 border-dashed border-lime-500 flex items-center justify-center cursor-pointer hover:bg-lime-50 transition-colors mb-2"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="프로필 미리보기"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="text-lime-500 text-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          )}

          {imagePreview && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {imagePreview
            ? '이미지를 클릭하여 변경하세요'
            : '프로필 이미지를 업로드하세요'}
        </p>
      </div>

      <div>
        <label
          htmlFor="nickname"
          className="block text-sm font-medium text-gray-700 mb-1"
        ></label>
        <input
          {...register('nickname')}
          type="text"
          id="nickname"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.nickname ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-lime-500`}
          placeholder="사용할 닉네임을 입력하세요"
        />
        {errors.nickname && (
          <p className="mt-1 text-sm text-red-600">{errors.nickname.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500"></p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !isButtonEnabled}
        className={`w-full font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors ${
          isButtonEnabled
            ? 'bg-lime-600 hover:bg-lime-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? '처리 중...' : '회원가입 완료🍋‍🟩'}
      </button>
    </form>
  );
};

export default ProfileStep;
