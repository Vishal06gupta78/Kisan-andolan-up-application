const { createCanvas, loadImage } = require('canvas');

const generateMemberCard = async (member) => {
  const width = 600;
  const height = 380;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#166534');
  gradient.addColorStop(0.5, '#15803d');
  gradient.addColorStop(1, '#166534');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Header
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('किसान आंदोलन उत्तर प्रदेश', width / 2, 50);

  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial';
  ctx.fillText('सदस्यता पहचान पत्र', width / 2, 75);

  // Photo placeholder or actual photo
  const photoX = 40;
  const photoY = 100;
  const photoSize = 100;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(photoX, photoY, photoSize, photoSize * 1.2);

  if (member.photoUrl && member.photoUrl.startsWith('http')) {
    try {
      const img = await loadImage(member.photoUrl);
      ctx.drawImage(img, photoX + 5, photoY + 5, photoSize - 10, photoSize * 1.2 - 10);
    } catch (e) {
      // Fallback to placeholder
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(photoX + 5, photoY + 5, photoSize - 10, photoSize * 1.2 - 10);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('फोटो', photoX + photoSize/2, photoY + photoSize * 0.6);
    }
  } else {
    // Placeholder
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(photoX + 5, photoY + 5, photoSize - 10, photoSize * 1.2 - 10);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('फोटो', photoX + photoSize/2, photoY + photoSize * 0.6);
  }

  // Member details
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';

  const detailsX = 170;
  const lineHeight = 28;
  let currentY = 115;

  ctx.font = 'bold 14px Arial';
  ctx.fillText('सदस्य ID:', detailsX, currentY);
  ctx.font = '14px Arial';
  ctx.fillText(member.memberId, detailsX + 100, currentY);

  currentY += lineHeight;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('नाम:', detailsX, currentY);
  ctx.font = '14px Arial';
  ctx.fillText(member.fullName, detailsX + 100, currentY);

  currentY += lineHeight;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('पिता:', detailsX, currentY);
  ctx.font = '14px Arial';
  ctx.fillText(member.fatherName, detailsX + 100, currentY);

  currentY += lineHeight;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('गांव:', detailsX, currentY);
  ctx.font = '14px Arial';
  ctx.fillText(member.address.village, detailsX + 100, currentY);

  currentY += lineHeight;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('जिला:', detailsX, currentY);
  ctx.font = '14px Arial';
  ctx.fillText(member.address.district, detailsX + 100, currentY);

  currentY += lineHeight;
  ctx.font = 'bold 14px Arial';
  ctx.fillText('फोन:', detailsX, currentY);
  ctx.font = '14px Arial';
  ctx.fillText(member.phone, detailsX + 100, currentY);

  // Footer
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('यह पहचान पत्र किसान आंदोलन उत्तर प्रदेश की संपत्ति है', width / 2, height - 30);

  ctx.fillStyle = '#ffffff';
  ctx.font = '10px Arial';
  ctx.fillText(`जारी तिथि: ${new Date(member.joinedAt).toLocaleDateString('hi-IN')}`, width / 2, height - 12);

  return canvas.toBuffer('image/png');
};

module.exports = { generateMemberCard };
