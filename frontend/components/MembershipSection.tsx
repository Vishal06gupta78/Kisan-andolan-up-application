'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Upload,
  Download,
  CheckCircle,
  Loader2,
  Camera,
  CreditCard,
} from 'lucide-react';

interface MemberForm {
  fullName: string;
  fatherName: string;
  village: string;
  district: string;
  pincode: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  occupation: string;
  photo: FileList;
}

export default function MembershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [memberCard, setMemberCard] = useState<{
    memberId: string;
    cardUrl: string | null;
    photoUrl: string | null;
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberForm>();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: MemberForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('fatherName', data.fatherName);
      formData.append('village', data.village);
      formData.append('district', data.district);
      formData.append('pincode', data.pincode);
      formData.append('phone', data.phone);
      if (data.email) formData.append('email', data.email);
      formData.append('dateOfBirth', data.dateOfBirth);
      formData.append('occupation', data.occupation);
      if (data.photo?.[0]) formData.append('photo', data.photo[0]);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/members/register`,
        { method: 'POST', body: formData }
      );

      const result = await response.json();
      console.log('API Response:', result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'पंजीकरण विफल');
      }

      const cardData = result.data || result;
      if (!cardData?.memberId) {
        throw new Error('Invalid response from server');
      }

      toast.success('सदस्यता सफलतापूर्वक पंजीकृत!');
      setMemberCard({
        memberId: cardData.memberId,
        cardUrl: cardData.cardUrl || null,
        photoUrl: cardData.photoUrl || null,
      });
      reset();
      setPreviewImage(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'सर्वर त्रुटि, कृपया बाद में प्रयास करें');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCard = () => {
    if (memberCard?.cardUrl) {
      const link = document.createElement('a');
      link.href = memberCard.cardUrl;
      link.download = `kisan-card-${memberCard.memberId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('कार्ड डाउनलोड हो रहा है!');
    }
  };

  return (
    <section
      id="membership"
      className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-24"
    >
      {/* Background Blur Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-kisan-green blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-kisan-saffron blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-kisan-saffron/10 px-4 py-1.5 text-sm font-semibold text-kisan-saffron">
            सदस्यता
          </span>
          <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl">
            किसान आंदोलन से{' '}
            <span className="text-kisan-green">जुड़ें</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            सदस्य बनें और किसानों के अधिकारों की लड़ाई में हमारे साथ शामिल
            हों। पंजीकरण के बाद आपका डिजिटल सदस्यता कार्ड तैयार होगा।
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* LEFT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-kisan-green to-kisan-green-dark p-6 text-white">
                <h3 className="flex items-center gap-3 text-2xl font-bold">
                  <CreditCard className="h-7 w-7" />
                  सदस्यता पंजीकरण फॉर्म
                </h3>
                <p className="mt-1 text-white/80">सभी जानकारी सही भरें</p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 p-6 md:p-8"
              >
                {/* Photo Upload */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="flex h-40 w-32 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-kisan-green/30 bg-kisan-green/5">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="mx-auto mb-2 h-8 w-8 text-kisan-green/50" />
                          <span className="text-xs text-kisan-green/70">
                            फोटो अपलोड करें
                          </span>
                        </div>
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-kisan-green shadow-lg transition-colors hover:bg-kisan-green-dark">
                      <Upload className="h-5 w-5 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register('photo')}
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <User className="mr-1 inline h-4 w-4" />
                    पूरा नाम *
                  </label>
                  <input
                    {...register('fullName', {
                      required: 'पूरा नाम आवश्यक है',
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                    placeholder="अपना पूरा नाम लिखें"
                  />
                  {errors.fullName && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                {/* Father Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <User className="mr-1 inline h-4 w-4" />
                    पिता का नाम *
                  </label>
                  <input
                    {...register('fatherName', {
                      required: 'पिता का नाम आवश्यक है',
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                    placeholder="पिता का नाम"
                  />
                  {errors.fatherName && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.fatherName.message}
                    </span>
                  )}
                </div>

                {/* Village */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <MapPin className="mr-1 inline h-4 w-4" />
                    गांव/शहर *
                  </label>
                  <input
                    {...register('village', {
                      required: 'गांव आवश्यक है',
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                    placeholder="गांव या शहर का नाम"
                  />
                  {errors.village && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.village.message}
                    </span>
                  )}
                </div>

                {/* District */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <MapPin className="mr-1 inline h-4 w-4" />
                    जिला *
                  </label>
                  <input
                    {...register('district', {
                      required: 'जिला आवश्यक है',
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                    placeholder="जिले का नाम"
                  />
                  {errors.district && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.district.message}
                    </span>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <MapPin className="mr-1 inline h-4 w-4" />
                    पिन कोड *
                  </label>
                  <input
                    {...register('pincode', {
                      required: 'पिन कोड आवश्यक है',
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: '6 अंकों का वैध पिन कोड',
                      },
                    })}
                    maxLength={6}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                    placeholder="6 अंकों का पिन कोड"
                  />
                  {errors.pincode && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.pincode.message}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <Phone className="mr-1 inline h-4 w-4" />
                    मोबाइल नंबर *
                  </label>
                  <input
                    {...register('phone', {
                      required: 'मोबाइल नंबर आवश्यक है',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: '10 अंकों का मोबाइल नंबर',
                      },
                    })}
                    maxLength={10}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                    placeholder="10 अंकों का मोबाइल नंबर"
                  />
                  {errors.phone && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <Mail className="mr-1 inline h-4 w-4" />
                    ईमेल (वैकल्पिक)
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                    placeholder="ईमेल पता"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <Calendar className="mr-1 inline h-4 w-4" />
                    जन्म तिथि *
                  </label>
                  <input
                    type="date"
                    {...register('dateOfBirth', {
                      required: 'जन्म तिथि आवश्यक है',
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                  />
                  {errors.dateOfBirth && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </div>

                {/* Occupation */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    <User className="mr-1 inline h-4 w-4" />
                    पेशा *
                  </label>
                  <select
                    {...register('occupation', {
                      required: 'पेशा चुनें',
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-kisan-green focus:ring-2 focus:ring-kisan-green/20"
                  >
                    <option value="">पेशा चुनें</option>
                    <option value="किसान">किसान</option>
                    <option value="मजदूर">मजदूर</option>
                    <option value="व्यापारी">व्यापारी</option>
                    <option value="अन्य">अन्य</option>
                  </select>
                  {errors.occupation && (
                    <span className="mt-1 text-xs text-red-500">
                      {errors.occupation.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-kisan-saffron to-orange-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      पंजीकरण हो रहा है...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      सदस्यता लें
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE - CARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {memberCard ? (
              <div className="rounded-3xl border-2 border-kisan-green/20 bg-white p-8 shadow-2xl">
                <h3 className="mb-4 text-center text-xl font-bold text-gray-900">
                  आपका सदस्यता कार्ड तैयार!
                </h3>

                {/* Show the actual card image */}
                {memberCard.cardUrl && (
                  <div className="mb-6 overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={memberCard.cardUrl}
                      alt="Membership Card"
                      className="w-full object-contain"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <p className="text-center text-sm text-gray-600">
                    सदस्य ID:{' '}
                    <span className="font-mono font-bold text-kisan-green">
                      {memberCard.memberId}
                    </span>
                  </p>

                  <button
                    onClick={downloadCard}
                    disabled={!memberCard.cardUrl}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition-colors ${
                      memberCard.cardUrl
                        ? 'bg-kisan-green hover:bg-kisan-green-dark'
                        : 'cursor-not-allowed bg-gray-400'
                    }`}
                  >
                    <Download className="h-5 w-5" />
                    {memberCard.cardUrl
                      ? 'कार्ड डाउनलोड करें'
                      : 'कार्ड उपलब्ध नहीं'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-gradient-to-br from-kisan-green to-kisan-green-dark p-8 text-white shadow-xl">
                <h3 className="mb-4 text-xl font-bold">क्या आप जानते हैं?</h3>
                <p className="leading-relaxed text-white/80">
                  किसान आंदोलन उत्तर प्रदेश के 50,000+ सदस्य पूरे प्रदेश में
                  किसानों के हितों के लिए कार्यरत हैं।
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}