#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <stdio.h>
#include <bitset>
#include <time.h>

using namespace std;

// 파일을 한 줄 읽어 buf에 저장한다.
// eol을 만나면, buf에 저장하는 것을 멈추고 파일의 지시자를 다음 줄로 옮긴다.
int getline(string& buf, const char eol, ifstream& in)
{
	buf.clear();

	char ch = '\0';
	while (in)
	{
		in.get(ch);

		if (ch == eol)
		{
			while (in)
			{
				in.get(ch);

				if (ch == '\n')
					break;
			}

			if (buf.empty())
				continue;
			else
				break;
		}
		else if (ch == '\n')
		{
			if (buf.empty())
				continue;
			else
				break;
		}

		buf += ch;
	}

	if (buf.empty())
		return -1;
	else
		return 0;
}

void process(string dataPath, string tagListPath, string outputPath)
{
	cout << "시작함.\n";
	// 파일 스트림 열기
	ifstream data(dataPath);
	ifstream tagList(tagListPath);
	ofstream output(outputPath);

	// 열렸는지 확인
	if (!data.is_open())
	{
		cout << "데이터 파일을 열지 못함\n";

		return;
	}

	if (!tagList.is_open())
	{
		cout << "태그 목록 파일을 열지 못함\n";

		return;
	}
	
	if (!output.is_open())
	{
		cout << "출력 파일을 열지 못함\n";

		return;
	}

	// 작업 일시를 주석으로 작성
	output << "// epoch time: " << time(NULL) << "\n";

	// <태그 목록 읽어들이고 코드 만들어서 매칭시키기>
	output << "// 이하 태그별 코드\n";
	output << "let tagMap = new Map()\n";

	map<string, int> tagMap;

	int cnt = 0;
	while (tagList)
	{
		string buf;

		if (getline(buf, '#', tagList) < 0)
			break;

		tagMap[buf] = 1 << cnt++;

		//cout << "태그 읽음: " << buf << "\t\t" << bitset<32>(tagMap[buf]) << "\n";

		output << "tagMap.set('" << buf << "', " << tagMap[buf] << ")\n";
	}
	output << "\n";

	// <데이터 읽어들이고 파싱하기>
	// #은 주석이므로, # 이후부터 줄바꿈이 일어나기 전까지의 데이터는 무시
	//
	// 데이터 형식은 아래와 같다:
	//
	// 대원 이름\n
	// 태그1 태그2 태그3\n
	//
	// 태그는 공백문자 ' ' 또는 '\t'으로 구분된다.

	output << "// 이하 대원별 태그코드\n";
	output << "let opMap = new Map()\n";
	while (data)
	{
		string buf, name;
		vector<string> tags;

		// 대원 이름 읽기
		if (getline(buf, '#', data) < 0)
			break;

		name = buf;

		// 태그 읽기
		if (getline(buf, '#', data) < 0)
			break;

		string tagstr;
		for (int i = 0; i < buf.size(); ++i)
		{
			if (buf.at(i) == ' ' || buf.at(i) == '\t' || buf.at(i) == '\n')
			{
				if (tagstr.empty())
					continue;
				
				tags.push_back(tagstr);
				tagstr.clear();

				continue;
			}

			if (buf.at(i) == '\n')
				continue;
			
			tagstr += buf.at(i);
		}
		// 마지막 태그까지 벡터에 추가
		if (!tagstr.empty())
			tags.push_back(tagstr);


		// 태그들을 하나의 정수로 변환
		int tagCode = 0;
		for (string& tag : tags)
			tagCode += tagMap[tag];

		/*
		if ((tagCode & tagMap["출현불가"]) == false)
		{
			cout << "대원이름: " << name;
			if (tagCode & tagMap["고급특별채용"])
				cout << "(고급특별채용)";
			if (tagCode & tagMap["출현불가"])
				cout << "(출현불가)";
			cout << "\n";
			cout << "태그코드: " << bitset<32>(tagCode) << "\n";
			cout << "\n";
		}
		*/

		output << "opMap.set('" << name << "', " << tagCode << ")\n";
	}

	cout << "완료됨.\n";
}

int main(void)
{
	string data = "c:/users/makep/desktop/inputdata.txt";
	string tagList = "c:/users/makep/desktop/tags.txt";
	string output = "c:/users/makep/desktop/output.js";

	process(data, tagList, output);

	return 0;
}