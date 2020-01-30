#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <stdio.h>
#include <bitset>
#include <time.h>

using namespace std;

// ������ �� �� �о� buf�� �����Ѵ�.
// eol�� ������, buf�� �����ϴ� ���� ���߰� ������ �����ڸ� ���� �ٷ� �ű��.
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
	cout << "������.\n";
	// ���� ��Ʈ�� ����
	ifstream data(dataPath);
	ifstream tagList(tagListPath);
	ofstream output(outputPath);

	// ���ȴ��� Ȯ��
	if (!data.is_open())
	{
		cout << "������ ������ ���� ����\n";

		return;
	}

	if (!tagList.is_open())
	{
		cout << "�±� ��� ������ ���� ����\n";

		return;
	}
	
	if (!output.is_open())
	{
		cout << "��� ������ ���� ����\n";

		return;
	}

	// �۾� �Ͻø� �ּ����� �ۼ�
	output << "// epoch time: " << time(NULL) << "\n";

	// <�±� ��� �о���̰� �ڵ� ���� ��Ī��Ű��>
	output << "// ���� �±׺� �ڵ�\n";
	output << "let tagMap = new Map()\n";

	map<string, int> tagMap;

	int cnt = 0;
	while (tagList)
	{
		string buf;

		if (getline(buf, '#', tagList) < 0)
			break;

		tagMap[buf] = 1 << cnt++;

		//cout << "�±� ����: " << buf << "\t\t" << bitset<32>(tagMap[buf]) << "\n";

		output << "tagMap.set('" << buf << "', " << tagMap[buf] << ")\n";
	}
	output << "\n";

	// <������ �о���̰� �Ľ��ϱ�>
	// #�� �ּ��̹Ƿ�, # ���ĺ��� �ٹٲ��� �Ͼ�� �������� �����ʹ� ����
	//
	// ������ ������ �Ʒ��� ����:
	//
	// ��� �̸�\n
	// �±�1 �±�2 �±�3\n
	//
	// �±״� ���鹮�� ' ' �Ǵ� '\t'���� ���еȴ�.

	output << "// ���� ����� �±��ڵ�\n";
	output << "let opMap = new Map()\n";
	while (data)
	{
		string buf, name;
		vector<string> tags;

		// ��� �̸� �б�
		if (getline(buf, '#', data) < 0)
			break;

		name = buf;

		// �±� �б�
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
		// ������ �±ױ��� ���Ϳ� �߰�
		if (!tagstr.empty())
			tags.push_back(tagstr);


		// �±׵��� �ϳ��� ������ ��ȯ
		int tagCode = 0;
		for (string& tag : tags)
			tagCode += tagMap[tag];

		/*
		if ((tagCode & tagMap["�����Ұ�"]) == false)
		{
			cout << "����̸�: " << name;
			if (tagCode & tagMap["���Ư��ä��"])
				cout << "(���Ư��ä��)";
			if (tagCode & tagMap["�����Ұ�"])
				cout << "(�����Ұ�)";
			cout << "\n";
			cout << "�±��ڵ�: " << bitset<32>(tagCode) << "\n";
			cout << "\n";
		}
		*/

		output << "opMap.set('" << name << "', " << tagCode << ")\n";
	}

	cout << "�Ϸ��.\n";
}

int main(void)
{
	string data = "c:/users/makep/desktop/inputdata.txt";
	string tagList = "c:/users/makep/desktop/tags.txt";
	string output = "c:/users/makep/desktop/output.js";

	process(data, tagList, output);

	return 0;
}