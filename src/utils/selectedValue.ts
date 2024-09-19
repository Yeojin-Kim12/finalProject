export const getValues = (
  activeTab: 'price' | 'squareMeter' | 'householdNumber',
  isSquareMeterToggle: boolean,
) => {
  if (activeTab === 'price')
    return [
      { id: 1, value: 0, text: '전체' },
      { id: 2, value: 5000, text: '~5천' },
      { id: 3, value: 5000, text: '5천' },
      { id: 4, value: 10000, text: '1억' },
      { id: 5, value: 20000, text: '2억' },
      { id: 6, value: 30000, text: '3억' },
      { id: 7, value: 40000, text: '4억' },
      { id: 8, value: 50000, text: '5억' },
      { id: 9, value: 60000, text: '6억' },
      { id: 10, value: 70000, text: '7억~' },
    ];
  if (activeTab === 'squareMeter' && !isSquareMeterToggle)
    return [
      { id: 1, value: 0, text: '전체' },
      { id: 2, value: 10, text: '~10평' },
      { id: 3, value: 10, text: '10평' },
      { id: 4, value: 20, text: '20평' },
      { id: 5, value: 30, text: '30평' },
      { id: 6, value: 40, text: '40평' },
      { id: 7, value: 50, text: '50평' },
      { id: 8, value: 60, text: '60평' },
      { id: 9, value: 70, text: '70평' },
      { id: 10, value: 80, text: '80평~' },
    ];
  if (activeTab === 'squareMeter' && isSquareMeterToggle)
    return [
      { id: 1, value: 0, text: '전체' },
      { id: 2, value: 33, text: '~33㎡' },
      { id: 3, value: 33, text: '33㎡' },
      { id: 4, value: 66, text: '66㎡' },
      { id: 5, value: 99, text: '99㎡' },
      { id: 6, value: 132, text: '132㎡' },
      { id: 7, value: 165, text: '165㎡' },
      { id: 8, value: 198, text: '198㎡' },
      { id: 9, value: 231, text: '231㎡' },
      { id: 10, value: 264, text: '264㎡~' },
    ];
  if (activeTab === 'householdNumber')
    return [
      { id: 1, value: 0, text: '전체' },
      { id: 2, value: 1000, text: '~1천' },
      { id: 3, value: 1000, text: '1천' },
      { id: 4, value: 1500, text: '1.5천' },
      { id: 5, value: 2000, text: '2천' },
      { id: 6, value: 2500, text: '2.5천' },
      { id: 7, value: 3000, text: '3천' },
      { id: 8, value: 4000, text: '4천' },
      { id: 9, value: 5000, text: '5천' },
      { id: 10, value: 6000, text: '6천~' },
    ];
  return [];
};
