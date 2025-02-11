import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/helper/formatDate';
import { HiStar, HiPencilAlt } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDashboardAlumni } from '@/hooks/dashboard/alumni/useStore.hook';
import { useCvAlumni } from '@/hooks/cv/cvAlumni.hook';
import { getUser, User } from '@/hooks/auth/authClient';

export default function DashboardAlumni() {
  const { tCount, dataDashboardAlumni, getDashboardAlumni } = useDashboardAlumni();
  const { getDataCvAlumni } = useCvAlumni();
  const [user, setUser] = useState<User>();
  const basePath = process.env.NEXT_PUBLIC_BASEPATH;

  const roleAlumni: boolean | undefined = user?.roles?.includes('alumni');
  const roleAdmin: boolean | undefined = user?.roles?.includes('admin');
  const roleMahasiswa: boolean | undefined = user?.roles?.includes('mahasiswa');

  useEffect(() => {
    const result = getUser();
    if (result) setUser(result);
  }, []);
  useEffect(() => {
    getDashboardAlumni();
    getDataCvAlumni();
  }, []);

  return (
    <section className="py-5">
      {/* Welcome Message */}
      <div className="mb-5">
        <h1 className="font-semibold text-gray-500 text-2xl mb-3 text-center sm:text-left">
          Welcome, {user?.name ?? "Username"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Data Alumni Section */}
        <div className="flex flex-col gap-6">
          {/* Improve Alumni Data Card */}
          <div className="p-6 flex flex-col sm:flex-row gap-5 items-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="basis-28 aspect-square relative rounded-full border-4 border-white shadow-lg shrink-0">
              <Image
                src={`${basePath}/draw/undraw_Experience_design_re_dmqq.png`}
                alt="dashboard-image"
                fill
                className="object-cover rounded-full"
              />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">Improve Your Alumni Data</h1>
              <p className="text-sm">
                You are now level <span className="font-semibold text-yellowUDINUS">{tCount}</span>. Keep up the great work!
              </p>
            </div>
          </div>

          {/* Data Alumni Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(dataDashboardAlumni || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex items-start p-5 bg-white rounded-lg shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-4xl sm:text-6xl text-yellowUDINUS shrink-0">
                  {value.exists ? <HiStar /> : <HiStar className="text-gray-300" />}
                </div>
                <div className="flex-1 ml-4 sm:ml-6">
                  <p className="text-base sm:text-sm font-semibold capitalize">{key}</p>
                  {value.updated_at && (
                    <p className="text-xs sm:text-sm text-gray-500">Last updated {formatDate(value.updated_at)}</p>
                  )}
                </div>
                <Link
                  href={`/dashboard/alumni/${key}`}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <HiPencilAlt className="text-2xl sm:text-3xl" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Improve Profile and Generate CV Section */}
        <div className="flex flex-col gap-6">
          {/* Improve Your Profile */}
          <div className="p-6 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white shadow-xl rounded-lg">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="text-center sm:text-left">
                <h4 className="text-sm sm:text-xl font-semibold">Improve Your Profile</h4>
                <p className="mb-4 text-sm sm:text-base">
                  Every profile has its own story. Update yours to reflect your journey.
                </p>
                <Link
                  href="/dashboard/profile"
                  className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                >
                  Update Profile
                </Link>
              </div>

              <div className="basis-28 aspect-square relative rounded-full border-4 border-white">
                <Image
                  src={`${basePath}/draw/undraw_Experience_design_re_dmqq.png`}
                  alt="dashboard-image"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Generate CV Section */}
          <div className="p-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 text-white shadow-xl rounded-lg">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="text-center sm:text-left">
                <h4 className="text-sm sm:text-xl font-semibold">Generate Your Curriculum Vitae</h4>
                <p className="mb-4 text-sm sm:text-base">
                  Click the button below to create your CV effortlessly.
                </p>
                <a
                  target="_blank"
                  href={`${basePath}/api/generate-cv/pdf`}
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                >
                  Generate CV
                </a>
              </div>

              <div className="basis-28 aspect-square relative rounded-full border-4 border-white">
                <Image
                  src={`${basePath}/draw/undraw_Experience_design_re_dmqq.png`}
                  alt="dashboard-image"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
