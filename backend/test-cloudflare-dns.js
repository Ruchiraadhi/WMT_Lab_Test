const dns = require('dns').promises;

// Use Cloudflare DNS (1.1.1.1)
dns.setServers(['1.1.1.1', '1.0.0.1']);

async function testMongoDB() {
  console.log('🔍 Testing MongoDB with Cloudflare DNS\n');
  
  try {
    const ips = await dns.resolve4('cluster0.tawl4zg.mongodb.net');
    console.log('   ✅ DNS resolved successfully:', ips);
  } catch (err) {
    console.log('   ❌ DNS failed:', err.message);
  }
}

testMongoDB();
