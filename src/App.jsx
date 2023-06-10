import {
  Button,
  Center,
  Group,
  JsonInput,
  MantineProvider,
  Stack,
  Text,
  Textarea,
  rem,
} from "@mantine/core";
import { Dropzone, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import {
  IconFileSpreadsheet,
  IconTable,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import axios from "axios";
import byteSize from "byte-size";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function App() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [users, setUsers] = useState(null);
  const [text, setText] = useState("");

  const handleDrop = (filesArr) => {
    const realName = filesArr[0].name;
    let realSize = byteSize(filesArr[0].size);
    realSize = `${realSize.value} ${realSize.unit}`;

    const reader = new FileReader();
    reader.readAsArrayBuffer(filesArr[0]);
    reader.onload = (e) => {
      setName(realName);
      setSize(realSize);
      setFile(e.target.result);
    };
  };

  const handleSubmit = () => {
    if (file !== null) {
      const workbook = XLSX.read(file, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonUsers = XLSX.utils.sheet_to_json(worksheet);

      setUsers(jsonUsers);
    } else {
      setUsers(null);
    }
  };

  const sendEmail = async () => {
    await axios.post("http://localhost:8000/mail", {
      text,
      users,
    });
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Group className="m-12">
        <Stack>
          <Dropzone
            onDrop={handleDrop}
            maxSize={3 * 1024 ** 2}
            accept={MS_EXCEL_MIME_TYPE}
            maxFiles={1}
            multiple={false}
            className="mx-auto"
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(100), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload size="3.2rem" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="3.2rem" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconFileSpreadsheet size="3.2rem" stroke={1} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag sheets here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach an excel file as you like, the file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>

          <Center>
            <div className="border-2 border-solid border-gray-300 rounded w-full">
              <Group position="apart" className="p-2">
                {!file ? (
                  <Text className="p-3 mx-auto">No Files Uploaded</Text>
                ) : (
                  <>
                    <Group>
                      <IconTable
                        color="gray"
                        size="3rem"
                        stroke={1}
                        className="bg-gray-300 p-2"
                      />
                      <Stack className="gap-0">
                        <Text>Name: {name}</Text>
                        <Text size="sm" color="dimmed" inline>
                          Size: {size}
                        </Text>
                      </Stack>
                    </Group>
                    <Button color="green" onClick={handleSubmit}>
                      Convert
                    </Button>
                  </>
                )}
              </Group>
            </div>
          </Center>
          <div className="mx-auto w-full">
            <JsonInput
              placeholder="Json string will appear here"
              label="Json Output"
              minRows={5}
              value={users ? `${JSON.stringify(users)}` : ""}
              withAsterisk
            />
          </div>
        </Stack>
        <Stack className="w-full md:w-1/2">
          <div className="mx-auto w-full">
            <Textarea
              placeholder="Start writing your email"
              label="Email Body"
              minRows={13}
              value={text}
              onChange={(event) => setText(event.currentTarget.value)}
              withAsterisk
            />
          </div>
          <div className="mx-auto">
            <Button color="gray" onClick={sendEmail}>
              Send Bulk Email
            </Button>
          </div>
        </Stack>
      </Group>
    </MantineProvider>
  );
}
