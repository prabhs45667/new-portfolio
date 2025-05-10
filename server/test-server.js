/**
 * Simple test script to verify the visitor counter SQL backend is working correctly
 */
const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001/api';
const TESTS_TO_RUN = 2; // Number of mock visits to simulate

async function runTests() {
  console.log('🧪 Testing visitor counter API...');
  
  try {
    // 1. Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_URL}/health`);
    if (!healthResponse.ok) {
      throw new Error(`Health check failed with status: ${healthResponse.status}`);
    }
    const healthData = await healthResponse.json();
    console.log('✅ Health endpoint working!', healthData);
    
    // 2. Check initial visitor count
    console.log('\n2. Checking initial visitor count...');
    const initialCountResponse = await fetch(`${API_URL}/visitors`);
    if (!initialCountResponse.ok) {
      throw new Error(`Failed to get initial count. Status: ${initialCountResponse.status}`);
    }
    const initialCountData = await initialCountResponse.json();
    console.log('✅ Initial visitor count:', initialCountData.count);
    
    // 3. Simulate multiple visits
    console.log(`\n3. Simulating ${TESTS_TO_RUN} visits...`);
    const countBeforeTests = initialCountData.count;
    
    for (let i = 0; i < TESTS_TO_RUN; i++) {
      console.log(`   Test visit #${i + 1}...`);
      const visitResponse = await fetch(`${API_URL}/visitors/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageUrl: 'http://localhost:3000/test',
          timestamp: new Date().toISOString()
        }),
      });
      
      if (!visitResponse.ok) {
        throw new Error(`Visit #${i + 1} failed. Status: ${visitResponse.status}`);
      }
      
      const visitData = await visitResponse.json();
      console.log(`   Visit #${i + 1} result:`, {
        count: visitData.count,
        wasNewVisitor: visitData.isNewVisitor
      });
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // 4. Get final count
    console.log('\n4. Checking final visitor count...');
    const finalCountResponse = await fetch(`${API_URL}/visitors`);
    const finalCountData = await finalCountResponse.json();
    console.log('✅ Final visitor count:', finalCountData.count);
    
    // 5. Check analytics
    console.log('\n5. Checking analytics data...');
    const analyticsResponse = await fetch(`${API_URL}/visitors/analytics`);
    const analyticsData = await analyticsResponse.json();
    console.log('✅ Recent visits:', analyticsData.recentVisits.length);
    console.log('✅ Unique visitors (24h):', analyticsData.uniqueVisitors24h);
    
    // 6. Summary
    console.log('\n📊 Test Summary:');
    console.log('-------------------');
    console.log(`Initial count: ${countBeforeTests}`);
    console.log(`Final count: ${finalCountData.count}`);
    console.log(`Expected increment: 1 (first visit only due to IP deduplication)`);
    console.log(`Actual increment: ${finalCountData.count - countBeforeTests}`);
    
    if (finalCountData.count > countBeforeTests) {
      console.log('✅ Test passed! The counter is incrementing correctly.');
    } else {
      console.log('⚠️ Count did not increment as expected. Check server logs for details.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

console.log('Starting tests in 2 seconds...');
setTimeout(runTests, 2000); 