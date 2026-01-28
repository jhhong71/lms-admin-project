<template>
  <v-card class="flex-grow-1 d-flex flex-column h-100" elevation="0" border>
    <v-card-item class="pa-5 pb-2">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="d-flex align-center text-h6 font-weight-bold">
          <div class="bg-primary rounded mr-3" style="width: 4px; height: 24px;"></div>강의 목록
        </div>
      </div>
      
      <!-- 검색 필터 영역 -->
      <v-row dense class="bg-grey-lighten-4 pa-4 rounded border">
        <!-- 1. 개설 연도 -->
        <v-col cols="12" sm="6" md="2">
          <v-select 
            v-model="search.year" 
            :items="['전체', '2025', '2024', '2023']" 
            label="개설 연도"
            hide-details
            bg-color="white"
            density="compact"
            variant="outlined"
            color="primary"
          />
        </v-col>

        <!-- 2. 학기 -->
        <v-col cols="12" sm="6" md="2">
          <v-select 
            v-model="search.sem" 
            :items="['전체', '1학기', '2학기', '여름학기', '겨울학기']" 
            label="학기"
            hide-details
            bg-color="white"
            density="compact"
            variant="outlined"
            color="primary"
          />
        </v-col>

        <!-- 3. 이수 구분 -->
        <v-col cols="12" sm="6" md="2">
          <v-select 
            v-model="search.type" 
            :items="['전체', '전공필수', '전공선택', '교양']" 
            label="이수 구분"
            hide-details
            bg-color="white"
            density="compact"
            variant="outlined"
            color="primary"
          />
        </v-col>

        <!-- 4. 검색어 (너비 5 -> 4로 축소) -->
        <v-col cols="12" md="4">
          <v-text-field 
            v-model="search.keyword"
            label="검색어 (강의명/교수명)" 
            prepend-inner-icon="mdi-magnify" 
            single-line 
            clearable
            hide-details
            bg-color="white"
            density="compact"
            variant="outlined"
            color="primary"
            @keyup.enter="fetchData" 
            @click:clear="fetchData"
          />
        </v-col>

        <!-- 5. 초기화 버튼 -->
        <v-col cols="6" md="1">
          <v-btn 
            prepend-icon="mdi-refresh"
            color="grey-darken-1" 
            variant="outlined"
            block 
            height="40" 
            class="font-weight-bold bg-white"
            @click="resetSearch"
          >
            초기화
          </v-btn>
        </v-col>

        <!-- 6. 조회 버튼 -->
        <v-col cols="6" md="1">
          <v-btn 
            color="primary" 
            block 
            height="40" 
            class="font-weight-bold"
            @click="fetchData"
          >
            조회
          </v-btn>
        </v-col>
      </v-row>
    </v-card-item>

    <v-card-text class="flex-grow-1 pa-5 pt-0 d-flex flex-column" style="min-height: 500px;">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="d-flex text-grey-darken-1">
          검색 결과: <strong class="text-primary ml-1">{{ rowData.length }}</strong>건
        </div>
  
        <div class="d-flex gap-2">
          <v-btn prepend-icon="mdi-download" variant="outlined" color="grey-darken-1" size="small" @click="onExportClick">엑셀 다운로드</v-btn>
          <!-- <v-btn prepend-icon="mdi-plus" color="primary" variant="flat" size="small">신규 개설</v-btn> -->
        </div>
      </div>
      
      <!-- Grid -->
      <div ref="gridContainer" class="ag-theme-alpine w-100 flex-grow-1"></div>

      <!-- Custom Pagination -->
      <div class="d-flex justify-center justify-sm-space-between align-center pt-4">
        <div style="width: 100px;" class="d-none d-sm-block">
          <v-select
            v-model="pageSize"
            :items="[10, 15, 20, 50, 100]"
            label="페이지당 행수"
            variant="outlined"
            density="compact"
            hide-details
            color="primary"
            class="text-caption"
            @update:model-value="onPageSizeChange"
          ></v-select>
        </div>

        <div class="d-flex justify-center align-center gap-1">
        <v-btn icon="mdi-chevron-double-left" variant="outlined" size="x-small" color="grey" class="custom-page rounded" :disabled="currentPage === 1" @click="onBtnFirst" />
        <v-btn icon="mdi-chevron-left" variant="outlined" size="x-small" color="grey" class="custom-page rounded" :disabled="currentPage === 1" @click="onBtnPrev" />
        
        <v-btn v-for="page in totalPages" :key="page" size="x-small" :variant="currentPage === page ? 'flat' : 'text'" :color="currentPage === page ? 'primary' : 'grey-darken-1'" class="custom-page rounded font-weight-bold" @click="onBtnPage(page)">{{ page }}</v-btn>
        
        <v-btn icon="mdi-chevron-right" variant="outlined" size="x-small" color="grey" class="custom-page rounded" :disabled="currentPage === totalPages" @click="onBtnNext" />
        <v-btn icon="mdi-chevron-double-right" variant="outlined" size="x-small" color="grey" class="custom-page rounded" :disabled="currentPage === totalPages" @click="onBtnLast" />
        </div>

        <div style="width: 100px;" class="d-none d-sm-block"></div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue';
import { createGrid, type GridOptions, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const gridContainer = ref<HTMLElement | null>(null);
const gridApi = shallowRef<any>(null);

// 검색 상태
const search = ref({ 
  year: '전체', 
  sem: '전체', 
  type: '전체',
  keyword: '' 
});

const onExportClick = () => {
  if (gridApi.value) {
    gridApi.value.exportDataAsCsv({
      fileName: '강의목록.csv'
    });
  }
};

const rowData = ref<any[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = ref(20);

const gridOptions: GridOptions = {
  columnDefs: [
    { headerName: "No", field: "no", width: 60, pinned: 'left', cellClass: "text-center text-grey" },
    { headerName: "연도", field: "year", width: 80, cellClass: "text-center" },
    { headerName: "학기", field: "semester", width: 80, cellClass: "text-center" },
    { 
      headerName: "이수 구분", field: "type", width: 120, cellClass: "text-center",
      cellRenderer: (params: any) => {
          const colors: Record<string, string> = { 
              '전공필수': 'text-red-600 bg-red-50 border-red-100', 
              '전공선택': 'text-blue-600 bg-blue-50 border-blue-100', 
              '교양': 'text-gray-600 bg-gray-100 border-gray-200' 
          };
          const cls = colors[params.value] || 'text-black';
          return `<span class="${cls} common-badge px-2 py-0.5 rounded text-xs font-bold">${params.value}</span>`;
      }
    },
    { headerName: "강의명", field: "name", flex: 1, minWidth: 200, cellStyle: { fontWeight: 'bold' }, cellClass: "pd-clamp-" },
    { headerName: "담당 교수", field: "professor", width: 120, cellClass: "text-center" },
    { headerName: "학점", field: "credits", width: 80, cellClass: "text-center" },
    { headerName: "수강생", field: "students", width: 90, cellClass: "text-center" },
  ],
  defaultColDef: { sortable: true, filter: true, resizable: true },
  pagination: true,
  paginationPageSize: 20,
  suppressPaginationPanel: true,
  onPaginationChanged: () => {
    if (gridApi.value) {
      currentPage.value = gridApi.value.paginationGetCurrentPage() + 1;
      totalPages.value = gridApi.value.paginationGetTotalPages();
    }
  }
};

const onBtnFirst = () => gridApi.value?.paginationGoToFirstPage();
const onBtnPrev = () => gridApi.value?.paginationGoToPreviousPage();
const onBtnNext = () => gridApi.value?.paginationGoToNextPage();
const onBtnLast = () => gridApi.value?.paginationGoToLastPage();
const onBtnPage = (page: number) => gridApi.value?.paginationGoToPage(page - 1);

// 페이지 사이즈 변경 핸들러
const onPageSizeChange = (newSize: number) => {
  if (gridApi.value) {
    gridApi.value.setGridOption('paginationPageSize', Number(newSize));
  }
};

// Mock 데이터 생성
const generateMockData = () => {
  const lectureNames = ["자료구조", "알고리즘", "운영체제", "데이터베이스 시스템의 이론적 기초와 관계형 모델을 중심으로 한 데이터 모델링, 정규화, SQL 기반 질의 처리, 트랜잭션 관리, 동시성 제어, 인덱싱 기법, 성능 최적화 및 대규모 데이터베이스 설계와 운영에 대한 종합적 이해", "네트워크", "소프트웨어공학과 협업 기반 개발 프로세스", "인공지능", "머신러닝", "웹프로그래밍", "컴퓨터구조"];
  const professors = ["홍길동", "김철수", "이영희", "박민수", "최동훈", "정지원", "윤서연"];
  const years = ["2025", "2024", "2023"];
  const sems = ["1학기", "2학기"];
  const types = ["전공필수", "전공선택", "교양"];

  return Array.from({ length: 100 }, (_, i) => {
    return {
      originalNo: i + 1, // 고유 ID
      year: years[Math.floor(Math.random() * years.length)],
      semester: sems[Math.floor(Math.random() * sems.length)],
      type: types[Math.floor(Math.random() * types.length)],
      name: lectureNames[i % lectureNames.length] + ` (${Math.floor(Math.random() * 3) + 1}분반)`,
      professor: professors[i % professors.length],
      credits: i % 5 === 0 ? 2 : 3,
      students: 20 + Math.floor(Math.random() * 30)
    };
  });
};

// 전체 데이터
const allData = generateMockData();

// 데이터 조회 및 필터링 로직
const fetchData = () => {
  if(gridApi.value) gridApi.value.showLoadingOverlay();
  
  setTimeout(() => {
    // 1. 필터링 로직
    const filtered = allData.filter(item => {
      const matchYear = search.value.year === '전체' || item.year === search.value.year;
      const matchSem = search.value.sem === '전체' || item.semester === search.value.sem;
      const matchType = search.value.type === '전체' || item.type === search.value.type;
      
      // 검색어 (강의명 또는 교수명 포함 여부)
      const keyword = search.value.keyword?.trim();
      const matchKeyword = !keyword || 
                           item.name.includes(keyword) || 
                           item.professor.includes(keyword);

      return matchYear && matchSem && matchType && matchKeyword;
    });

    // 2. No 재부여
    const result = filtered.map((item, index) => ({
      ...item,
      no: index + 1
    }));
    
    rowData.value = result;

    // 3. 그리드 업데이트
    if(gridApi.value) {
      gridApi.value.setGridOption('rowData', result);
      
      if (result.length === 0) {
        gridApi.value.showNoRowsOverlay();
      } else {
        gridApi.value.hideOverlay();
      }
      
      // 페이지네이션 갱신
      setTimeout(() => {
         totalPages.value = gridApi.value.paginationGetTotalPages();
         if (currentPage.value > totalPages.value) {
            gridApi.value.paginationGoToFirstPage();
         }
      }, 50);
    }
  }, 300);
};

// 초기화 기능
const resetSearch = () => {
  search.value = {
    year: '전체',
    sem: '전체',
    type: '전체',
    keyword: ''
  };
  fetchData();
};

onMounted(() => {
  if (gridContainer.value) {
    gridApi.value = createGrid(gridContainer.value, gridOptions);
    fetchData();
  }
});
</script>