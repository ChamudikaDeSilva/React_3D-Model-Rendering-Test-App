import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function GenderSelection() {
  const [gender, setGender] = useState('');
  const [clothesType, setClothesType] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setClothesType(''); // Reset clothes type when gender changes
    setFilteredModels([]); // Reset filtered models when gender changes
  };

  const handleClothesTypeChange = (event) => {
    const selectedClothesType = event.target.value;
    setClothesType(selectedClothesType);

    // Filter models based on gender and clothes type
    const allModels = [
      '/models/female_frocks.glb',
      '/models/female_jumpsuits.glb',
      '/models/female_pants1.glb',
      '/models/female_pants2.glb',
      '/models/female_pants4.glb',
      '/models/female_shoes1.glb',
      '/models/female_shorts.glb',
      '/models/female_tshirts.glb',
      '/models/female_tshirts1.glb',
      '/models/female_tshirts2.glb',
      '/models/female_tshirts3.glb',
      '/models/male_cap.glb',
      '/models/male_hat.glb',
      '/models/male_jackets.glb',
      '/models/male_jackets1.glb',
      '/models/male_jackets2.glb',
      '/models/male_jumpsuits.glb',
      '/models/male_pants.glb',
      '/models/male_pants1.glb',
      '/models/male_pants2.glb',
      '/models/male_pants4.glb',
      '/models/male_sneakers.glb',
      '/models/male_sneakers1.glb',
      '/models/male_sneakers2.glb',
      '/models/male_tshirts.glb',
      '/models/male_tshirts1.glb',
      '/models/male_tshirts2.glb',
      '/models/male_tshirts3.glb',
    ];

    const filtered = allModels.filter(
      (model) => model.includes(gender) && model.includes(selectedClothesType)
    );
    setFilteredModels(filtered);
  };

  const getModelUrl = () => {
    if (gender === 'male') return '/models/male_latest_dummy.glb';
    if (gender === 'female') return '/models/female_latest_dummy.glb';
    return null;
  };

  const getModelCards = () => {
    if (filteredModels.length === 0) {
      return (
        <div className="text-center mt-4">
          <p>No models found.</p>
        </div>
      );
    }
    return filteredModels.map((modelUrl, index) => (
      <div
        key={index}
        className='bg-gray-100 rounded-lg shadow-md p-6 m-2 w-full sm:w-1/2 lg:w-full xl:w-full'
      >
        <Canvas style={{ width: '100%', height: '200px' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0.5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model url={modelUrl} scale={[1, 1, 1]} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    ));
  };

  return (
    <div className='flex h-screen'>
      {/* Left Side (Gender and Model Canvas) */}
      <div className='w-full lg:w-3/4 p-4 bg-gray-200 overflow-hidden'>
        <div className='bg-white rounded-lg shadow-md p-6 w-full sm:max-w-md mx-auto'>
          <h1 className='text-2xl font-bold mb-4 text-center'>Select Gender</h1>
          <div className='flex flex-col space-y-4'>
            <div>
              <label
                htmlFor='gender'
                className='block text-sm font-medium text-gray-700'
              >
                Gender
              </label>
              <select
                id='gender'
                name='gender'
                className='mt-1 block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                onChange={handleGenderChange}
                value={gender}
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </div>
        </div><br></br>
        {gender && (
          <div
            className='mt-8 bg-gray-100 mt-8 mx-auto w-full sm:w-96 h-96'
            style={{ width: '600px', height: '600px', margin: '0 auto' }}
          >
            <Canvas style={{ width: '100%', height: '100%' }}>
              <ambientLight intensity={1} />
              <directionalLight position={[0.5, 5, 5]} intensity={1} />
              <Suspense fallback={null}>
                <Model url={getModelUrl()} />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
        )}
      </div>
      {/* Right Side (Clothes Type and Filtered Models) */}
      <div className='w-full lg:w-1/4 p-4 bg-gray-100 overflow-y-auto h-full'>
        <div className='bg-white rounded-lg shadow-md p-6 w-full'>
          <h1 className='text-2xl font-bold mb-4 text-center'>
            Select Clothes Type
          </h1>
          <div className='flex flex-col space-y-4'>
            <div>
              <label
                htmlFor='clothesType'
                className='block text-sm font-medium text-gray-700'
              >
                Clothes Type
              </label>
              <select
                id='clothesType'
                name='clothesType'
                className='mt-1 block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                onChange={handleClothesTypeChange}
                value={clothesType}
                disabled={!gender}
              >
                <option value=''>Select Clothes Type</option>
                <option value='tshirts'>Tshirts</option>
                <option value='shirts'>Shirts</option>
                <option value='jackets'>Jackets</option>
                <option value='pants'>Pants</option>
                <option value='shoes'>Shoes</option>
                <option value='sneakers'>Sneakers</option>
                <option value='shorts'>Shorts</option>
                <option value='skirts'>Skirts</option>
                <option value='frocks'>Frocks</option>
                <option value='hats'>Hats</option>
                <option value='caps'>Caps</option>
                <option value='jumpsuits'>Jumpsuits</option>
              </select>
            </div>
          </div>
        </div>
        {/* Render filtered models below the dropdown */}
        <div className='mt-8'>{getModelCards()}</div>
      </div>
    </div>
  );
}

export default GenderSelection;
